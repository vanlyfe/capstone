const bcrypt = require("bcrypt")
const db = require("../db")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError,UnauthorizedError} = require("../utils/errors")

class User{
    static makePublicUser(user){
        return{
            id: user.id,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            username: user.username
           


        }
    }

    static async login(credentials){
        const requiredFields = ["email","password"]
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })
        if(credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid email.");
        }

        if(credentials.password.length < 1){
            throw new BadRequestError("Please input password");

        }

        const user = await User.fetchUserByEmail(credentials.email)
      

        if(user){
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if(isValid){
                return this.makePublicUser(user)
            }
        }

        
        throw new UnauthorizedError("Invalid email/password combo")

    }

    static async register(credentials){

        const requiredFields = ["firstName","lastName","username","email","password"]
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if(credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid email.");
        }

        if(credentials.password.length < 1){
            throw new BadRequestError("Please input password");

        }


        const existingUser = await User.fetchUserByEmail(credentials.email)
        if(existingUser){
            throw new BadRequestError(`Email already exists: ${credentials.email}`)
        }

        const existingUsername = await User.checkUsername(credentials.username)
        if(existingUsername){
            throw new BadRequestError(`Username already exists: ${credentials.username}`)

        }

        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

        const lowercasedEmail = credentials.email.toLowerCase();

        const result = await db.query(`
        INSERT INTO users(
            firstName,
            lastName,
            email,
            username,
            password
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id,firstName,lastName,email,username;
        `, [credentials.firstName,credentials.lastName,lowercasedEmail,credentials.username, hashedPassword]

        )

        const user = result.rows[0]

        return User.makePublicUser(user);

    }

    static async fetchUserByEmail(email){
        if(!email){
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()])
        const user = result.rows[0]
       
        return user
    }

    static async checkUsername(username){
        if(!username){
            throw new BadRequestError("No username provided")
        }

        const query = `SELECT * FROM users WHERE username = $1`
        const result = await db.query(query, [username])
        const user = result.rows[0]
        return user
    }
}


module.exports = User