const bcrypt = require('bcrypt');
const db = require('../db');
const { BCRYPT_WORK_FACTOR } = require('../config');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      username: user.username,
      birthdate: user.birthdate,
      createdAt : user.createdat
    
    };
  }

  static async login(credentials) {
    const requiredFields = ['email', 'password'];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (credentials.email.indexOf('@') <= 0) {
      throw new BadRequestError('Invalid email.');
    }

    if (credentials.password.length < 1) {
      throw new BadRequestError('Please input password');
    }

    const user = await User.fetchUserByEmail(credentials.email);

    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return this.makePublicUser(user);
      }
    }

    throw new UnauthorizedError('Invalid email/password combo');
  }

  static async getUserRating(userId){
    const result = await db.query(
      `
      SELECT AVG(rating), l.user_id
      FROM listings AS l
      LEFT JOIN ratings AS r on r.listing_id = l.id
      WHERE l.user_id = $1
      GROUP BY l.user_id
      
    
      

      `, [userId]
    )

    const res = result.rows[0]

    return res
  }

  static async register(credentials) {
    const requiredFields = [
      'firstName',
      'lastName',
      'username',
      'email',
      'password',
      'birthdate',
    ];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    this.authenticateBirthdate(credentials.birthdate)

    if (credentials.email.indexOf('@') <= 0 || credentials.email.length < 1) {
      throw new BadRequestError('Invalid email.');
    }

    if (credentials.password.length < 1) {
      throw new BadRequestError('Please input password');
    }

    if (credentials.firstName.length < 1) {
      throw new BadRequestError('Please input first name');
    }

    if (credentials.lastName.length < 1) {
      throw new BadRequestError('Please input last name');
    }

    if (credentials.username.length < 1) {
      throw new BadRequestError('Please input username');
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
            location,
            rating
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id,firstName,lastName,email,username,location, birthdate, gender, createdAt, updatedAt, rating;
        `,
      [
        credentials.firstName,
        credentials.lastName,
        lowercasedEmail,
        credentials.username,
        hashedPassword,
        credentials.gender,
        credentials.birthdate,
        credentials.location,
        null
      ]
    );

    var user = result.rows[0];
    console.log(user)
    user = User.makePublicUser(user)
    
    // const rate = await this.getUserRating(user.id)
    // user.rating = rate ? rate.avg : null
    return user;
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError('No email provided');
    }

    if (email.indexOf('@') <= 0) {
      throw new BadRequestError('Invalid email.');
    }

    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    var user = result.rows[0];
    if(user?.id){
    const rate = await this.getUserRating(user.id)
    user.rating = rate ? rate.avg : null
    }
    return user;
  }

  static async fetchUserById(id) {
    if (!id) {
      throw new BadRequestError('No id provided');
    }

    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await db.query(query, [id]);
    const user = result.rows[0];
    const rate = await this.getUserRating(user.id)
    user.rating = rate ? rate.avg : null

    return user;
  }

  static async checkUsername(username) {
    if (!username && !update) {
      throw new BadRequestError('No username provided');
    }

    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await db.query(query, [username]);
    var user = result.rows[0];
    if(user?.id){
    const rate = await this.getUserRating(user.id)
    user.rating = rate ? rate.avg : null
    }
    return user;
  }

  static async editUser({ userUpdate, userId }) {
    if (userUpdate.email) {
      if (userUpdate.email.indexOf('@') <= 0 || userUpdate.email.length < 1) {
        throw new BadRequestError('Invalid email.');
      }

      const existingUser = await User.fetchUserByEmail(userUpdate.email);
      if (existingUser) {
        throw new BadRequestError(`Email already exists: ${userUpdate.email}`);
      }
    }

    if (userUpdate.password?.length < 1) {
      throw new BadRequestError('Please input valid password');
    }

    if (userUpdate.firstName?.length < 1) {
      throw new BadRequestError('Please input valid first name');
    }

    if (userUpdate.lastName?.length < 1) {
      throw new BadRequestError('Please input valid last name');
    }

    if (userUpdate.username?.length < 1) {
      throw new BadRequestError('Please input valid username');
    }

    if (userUpdate.username) {
      const existingUsername = await User.checkUsername(userUpdate.username);
      if (existingUsername) {
        throw new BadRequestError(
          `Username already exists: ${userUpdate.username}`
        );
      }
    }
    var results = {};
    var hashedPassword;

    for (var [key, value] of Object.entries(userUpdate)) {
      if (key === 'password') {
        hashedPassword = await bcrypt.hash(value, BCRYPT_WORK_FACTOR);
      }

      const query =
        `UPDATE users
                       SET ` +
        key +
        ` = $1,
                       updatedAt = NOW()
                   WHERE id = $2
                   RETURNING id,firstName,lastName,email,username,location, birthdate, gender, createdAt, updatedAt;`;

      const result = await db.query(query, [
        key === 'password' ? hashedPassword : value,
        userId,
      ]);

      results = result.rows[0];
    }
    const rate = await this.getUserRating(results.id)
    results.rating = rate ? rate.avg : null
    return results;
  }

  static async deleteUser(userId) {
    await db.query(
      `
     DELETE FROM users
     WHERE id = $1;
    
     
     `,
      [userId]
    );
  }

  // Helper Functions

  /**
   * check that the user is over 18
   * @param {string} birthdate
   *
   */
  static authenticateBirthdate(birthdate) {
    const today = new Date();
    const birthdateDate = new Date(birthdate);
    let age = today.getFullYear() - birthdateDate.getFullYear();
    const m = today.getMonth() - birthdateDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdateDate.getDate())) {
      age--;
    }

    if (age < 18) {
      throw new BadRequestError('You must be over 18 to register');
    }
  }
}

module.exports = User;
