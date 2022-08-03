const bcrypt = require("bcrypt")
const db = require("../db")
const tokens = require("../utils/tokens")
const { BCRYPT_WORK_FACTOR } = require("../config")

const createUsers = async () => {
  await db.query(`
    INSERT INTO users (username, firstName, lastName, email, password, gender, image_url, birthdate)
    VALUES  
    (
      'afakih',
      'Ammar',
      'Fakih',
      'afakih@salesforce.com',
      '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}',
      'male',
      'https://www.fodors.com/wp-content/uploads/2022/04/jake-blucker-8LlJNFLTEm0-unsplash.jpg',
      '2000-07-05T07:00:00.000Z'
    ),
    (
      'votieno',
      'Vernon',
      'Otieno',
      'votieno@salesforce.com',
      '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}',
      'male',
      'https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty_16x9.jpg',
      '2000-07-05T07:00:00.000Z'
    ),
    (
      'etsehay',
      'Edilawit',
      'Tsehay',
      'etsehay@salesforce.com',
      '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}',
      'female',
      'https://i.natgeofe.com/n/0652a07e-42ed-4f3d-b2ea-0538de0c5ba3/seattle-travel_3x2.jpg',
      '2000-07-05T07:00:00.000Z'
    );
  `)

       


  const results = await db.query(`SELECT id FROM users ORDER BY id ASC`)
  

  const ids = results.rows.map((row) => row.id)
  
  return ids
}

const ammarToken = tokens.createUserJwt({ id : 1 })
const vernonToken = tokens.createUserJwt({ id : 2 })
const edilToken = tokens.createUserJwt({ id : 3 })

module.exports = {
  createUsers,
  ammarToken,
  vernonToken,
  edilToken
  
}
