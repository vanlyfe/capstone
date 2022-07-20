const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      username: user.username,
      gender: user.gender,
      location : user.location,
      birthdate : user.birthdate,
      password : user.password
    };
  }

  static async login(credentials) {
    const requiredFields = ["email", "password"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    if (credentials.password.length < 1) {
      throw new BadRequestError("Please input password");
    }

    const user = await User.fetchUserByEmail(credentials.email);

    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return this.makePublicUser(user);
      }
    }

    throw new UnauthorizedError("Invalid email/password combo");
  }

  static async register(credentials) {
    const requiredFields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
    ];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    if (credentials.password.length < 1) {
      throw new BadRequestError("Please input password");
    }

    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Email already exists: ${credentials.email}`);
    }

    const existingUsername = await User.checkUsername(credentials.username);
    if (existingUsername) {
      throw new BadRequestError(
        `Username already exists: ${credentials.username}`
      );
    }

    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    const lowercasedEmail = credentials.email.toLowerCase();

    const result = await db.query(
      `
        INSERT INTO users(
            firstName,
            lastName,
            email,
            username,
            password,
            gender,
            birthdate,
            location
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING id,firstName,lastName,password,email,username,location, birthdate, gender, createdAt, updatedAt;
        `,
      [
        credentials.firstName,
        credentials.lastName,
        lowercasedEmail,
        credentials.username,
        hashedPassword,
        credentials.gender,
        credentials.birthdate,
        credentials.location
      ]
    );

    const user = result.rows[0];

    return User.makePublicUser(user);
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    if (email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];

    return user;
  }

  static async fetchUserById(id) {
    if (!id) {
      throw new BadRequestError("No id provided");
    }

    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await db.query(query, [id]);
    const user = result.rows[0];

    return user;
  }

  static async checkUsername(username) {
    if (!username && !update) {
      throw new BadRequestError("No username provided");
    }

    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await db.query(query, [username]);
    const user = result.rows[0];
    return user;
  }

  static async editUser({ userUpdate, userId }) {

    if(userUpdate.email){
    const existingUser = await User.fetchUserByEmail(userUpdate.email);
    if (existingUser) {
      throw new BadRequestError(`Email already exists: ${userUpdate.email}`);
    }
  }

  if(userUpdate.username){
    const existingUsername = await User.checkUsername(userUpdate.username);
    if (existingUsername) {
      throw new BadRequestError(
        `Username already exists: ${userUpdate.username}`
      );
    }
  }
    var results = {};

    for(const [key, value] of Object.entries(userUpdate)){
        console.log(String(key))
        const query = `UPDATE users
                       SET ` + key + ` = $1,
                       updatedAt = NOW()
                   WHERE id = $2
                   RETURNING id,firstName,lastName,email,username,location, birthdate, gender, createdAt, updatedAt;`
        
        console.log(query)
        // const result = await db.query(
        //     `
        //     UPDATE users
        //     SET key = $2,
        //         updatedAt = NOW()
        //     WHERE id = $3
        //     RETURNING id,firstName,lastName,email,username,location, birthdate, gender, createdAt, updatedAt;
        //     `, [value, userId]
        // )
         const result = await db.query(
            query, [value, userId]
        )

        results = result.rows[0]
    }
    // const res = await db.query(
    //   `
    //         UPDATE users
    //         SET firstName = $1,
    //             lastName = $2,
    //             username = $3,
    //             email = $4,
    //             image_url = $5,
    //             location = $6,
    //             birthdate = $7,
    //             gender = $8,
    //             updatedAt = NOW()
    //         WHERE id = $9
    //         RETURNING id,firstName,lastName,email,username,location, birthdate, gender, createdAt, updatedAt;
            
    //         `,
    //   [
    //     userUpdate.firstName? userUpdate.firstName : firstName,
    //     userUpdate.lastName,
    //     userUpdate.username,
    //     userUpdate.email,
    //     userUpdate.image_url,
    //     userUpdate.location,
    //     userUpdate.birthdate,
    //     userUpdate.gender,
    //     userId

    //   ]
    // );

    return results
  }
}

module.exports = User;
