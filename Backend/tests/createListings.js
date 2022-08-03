const db = require("../db")

const createListings = async (userIds) => {
  const secondUserId = userIds[1]
  const thirdUserId = userIds[2]

  if (!secondUserId || !thirdUserId) {
    throw new Error(`No second or third id found in ${userIds.join(", ")}`)
  }

  await db.query(`
  INSERT INTO listings(user_id, price, location, max_accomodation, image_url, model, description, fees)
  VALUES (
    ${secondUserId},
    20.99,
    'San Francisco, California',
    3,
    'https://cdn.motor1.com/images/mgl/Q12M1/s1/2021-tesla-model-s-plaid.jpg',
    'Tesla Model S',
    '5 Month old tesla, clean and in great condition, driving around not allowed',
    4.5
  
  ),
  (
    ${secondUserId},
    40.99,
    'San Diego, California',
    1,
    'https://static.tcimg.net/vehicles/primary/122f4b2eb5fe71e0/2022-GMC-Savana_Cargo_Van-silver-full_color-driver_side_front_quarter.png',
    'GMC Savana',
    'Clean 3 year old van',
    4
  
  ),
  (
    ${secondUserId},
    30.00,
    'San Mateo, California',
    2,
    'https://global.toyota/pages/news/images/2019/11/05/1100/20191105_02_01_s.jpg',
    'Toyota RAV4',
    'Clean spacious vehicle, references available',
    5.99
  
  ),
  (
    ${secondUserId},
    170.50,
    'Menlo Park, California',
    8,
    'https://static.foxbusiness.com/foxbusiness.com/content/uploads/2021/01/RV.jpg',
    'Latest RV',
    'Large RV, able to host many people',
    10.5
  
  ),
  (
    ${secondUserId},
    72.05,
    'Newark, New York',
    3,
    'https://www.topgear.com/sites/default/files/2022/05/037.jpg',
    'Peugeot 308',
    'Recently purchased vehicle in a friendly neighbourhood',
    4.3
  
  ),
  (
    ${secondUserId},
    15.99,
    'Los Angeles, California',
    3,
    'https://media.ed.edmunds-media.com/audi/a8/2022/oem/2022_audi_a8_sedan_l_fq_oem_1_1600.jpg',
    '2022 Audi S8',
    'Latest Audi in the market, clean and hospitable',
    7.8
  
  ),
  (
    ${thirdUserId},
    20.99,
    'Seattle, Washington',
    1,
    'https://s1.cdn.autoevolution.com/images/models/MERCEDES-BENZ_GLC-2022_main.jpg',
    'Mercedes-Benz GLC',
    'Sleek benz for a sleek customer',
    11.55
  
  ),
  (
    ${thirdUserId},
    59.99,
    'Nairobi, Kenya',
    3,
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-bmw-alpina-b8-gran-coupe-4-1646929819.jpg?crop=0.670xw:0.670xh;0.162xw,0.162xh&resize=640:*',
    'BMW',
    'If you like sleeping on cosy seats at an affordable price, this is the home for you',
    3
  
  ),
  (
    ${thirdUserId},
    99.99,
    'Santa Cruz, California',
    5,
    'https://www.topgear.com/sites/default/files/cars-car/image/2020/07/dsc09285.jpg',
    'Ferrari SF90',
    'Clean, affordable ferrari. Meals may be provided',
    9.99
  
  ),
  (
    ${thirdUserId},
    23.00,
    'Oakland, California',
    3,
    'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2022/04_12/family_chooser_tecnica.jpg',
    'Lamborghini',
    'What can I say? Its a lambo',
    10.00
  
  ),
  (
    ${thirdUserId},
    17.80,
    'Poughkeepsie, New York',
    5,
    'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/portable-nav/small-vehicle-jellies/2022-camaro-2ss-gcf-colorizer.jpg?imwidth=960',
    'Chevrolet Camaro',
    'If you liked Bumbleebee in transformers, you will love sleeping in this car',
    16.99
  
  ),
  (
    ${thirdUserId},
    66.66,
    'Boston, Massachusetts',
    8,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Chevrolet_Corvette_Z06_-_Flickr_-_Alexandre_Pr%C3%A9vot_%287%29_%28cropped%29.jpg/1200px-Chevrolet_Corvette_Z06_-_Flickr_-_Alexandre_Pr%C3%A9vot_%287%29_%28cropped%29.jpg',
    'Chevrolet Covette C6',
    '10 year old covette, clean and still in great condition',
    12
  
  ),
  (
    ${thirdUserId},
    20.00,
    'Sydney, Austalia',
    4,
    'https://static.wikia.nocookie.net/starcars/images/6/68/Optimusprimealtmoviemode.jpg/revision/latest?cb=20120827215442',
    'Big truck',
    'This is optimus prime',
    10
  
  );
  `)

  const results = await db.query(`SELECT id FROM listings ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

module.exports = {
  createListings,
}
