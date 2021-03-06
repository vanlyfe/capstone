

INSERT INTO users (username, firstName, lastName, email, password, gender, image_url)
VALUES (
  'jbosire',
  'Joram',
  'Bosire',
  'jbosire@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male',
  'https://a.cdn-hotels.com/gdcs/production92/d1580/9a28fc70-9bea-11e8-a1b5-0242ac110053.jpg'

), 
(
  'afakih',
  'Ammar',
  'Fakih',
  'afakih@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male',
  'https://www.fodors.com/wp-content/uploads/2022/04/jake-blucker-8LlJNFLTEm0-unsplash.jpg'
),
(
  'votieno',
  'Vernon',
  'Otieno',
  'votieno@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male',
  'https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty_16x9.jpg'

),
(
  'etsehay',
  'Edilawit',
  'Tsehay',
  'etsehay@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'female',
  'https://i.natgeofe.com/n/0652a07e-42ed-4f3d-b2ea-0538de0c5ba3/seattle-travel_3x2.jpg'
);

INSERT INTO listings(user_id, price, location, max_accomodation, image_url, model, description, fees)
VALUES (
  1,
  20.99,
  'San Francisco, California',
  3,
  'https://cdn.motor1.com/images/mgl/Q12M1/s1/2021-tesla-model-s-plaid.jpg',
  'Tesla Model S',
  '5 Month old tesla, clean and in great condition, driving around not allowed',
  4.5

),
(
  1,
  40.99,
  'San Diego, California',
  1,
  'https://static.tcimg.net/vehicles/primary/122f4b2eb5fe71e0/2022-GMC-Savana_Cargo_Van-silver-full_color-driver_side_front_quarter.png',
  'GMC Savana',
  'Clean 3 year old van',
  4

),
(
  1,
  30.00,
  'San Mateo, California',
  2,
  'https://global.toyota/pages/news/images/2019/11/05/1100/20191105_02_01_s.jpg',
  'Toyota RAV4',
  'Clean spacious vehicle, references available',
  5.99

),
(
  2,
  170.50,
  'Menlo Park, California',
  8,
  'https://static.foxbusiness.com/foxbusiness.com/content/uploads/2021/01/RV.jpg',
  'Latest RV',
  'Large RV, able to host many people',
  10.5

),
(
  2,
  72.05,
  'Newark, New York',
  3,
  'https://www.topgear.com/sites/default/files/2022/05/037.jpg',
  'Peugeot 308',
  'Recently purchased vehicle in a friendly neighbourhood',
  4.3

),
(
  2,
  15.99,
  'Los Angeles, California',
  3,
  'https://media.ed.edmunds-media.com/audi/a8/2022/oem/2022_audi_a8_sedan_l_fq_oem_1_1600.jpg',
  '2022 Audi S8',
  'Latest Audi in the market, clean and hospitable',
  7.8

),
(
  3,
  20.99,
  'Seattle, Washington',
  1,
  'https://s1.cdn.autoevolution.com/images/models/MERCEDES-BENZ_GLC-2022_main.jpg',
  'Mercedes-Benz GLC',
  'Sleek benz for a sleek customer',
  11.55

),
(
  3,
  59.99,
  'Nairobi, Kenya',
  3,
  'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-bmw-alpina-b8-gran-coupe-4-1646929819.jpg?crop=0.670xw:0.670xh;0.162xw,0.162xh&resize=640:*',
  'BMW',
  'If you like sleeping on cosy seats at an affordable price, this is the home for you',
  3

),
(
  3,
  99.99,
  'Santa Cruz, California',
  5,
  'https://www.topgear.com/sites/default/files/cars-car/image/2020/07/dsc09285.jpg',
  'Ferrari SF90',
  'Clean, affordable ferrari. Meals may be provided',
  9.99

),
(
  4,
  23.00,
  'Oakland, California',
  3,
  'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2022/04_12/family_chooser_tecnica.jpg',
  'Lamborghini',
  'What can I say? Its a lambo',
  10.00

),
(
  4,
  17.80,
  'Poughkeepsie, New York',
  5,
  'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/portable-nav/small-vehicle-jellies/2022-camaro-2ss-gcf-colorizer.jpg?imwidth=960',
  'Chevrolet Camaro',
  'If you liked Bumbleebee in transformers, you will love sleeping in this car',
  16.99

),
(
  4,
  66.66,
  'Boston, Massachusetts',
  8,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Chevrolet_Corvette_Z06_-_Flickr_-_Alexandre_Pr%C3%A9vot_%287%29_%28cropped%29.jpg/1200px-Chevrolet_Corvette_Z06_-_Flickr_-_Alexandre_Pr%C3%A9vot_%287%29_%28cropped%29.jpg',
  'Chevrolet Covette C6',
  '10 year old covette, clean and still in great condition',
  12

);

INSERT INTO orders(user_id, taxes, total, guests, listing_id, startDate, endDate)
VALUES(
  1,
  5.99,
  20.99,
  3,
  1,
  '11/6/2022',
  '11/10/2022'
),
(
  1,
  10.99,
  25.00,
  2,
  2,
  '11/6/2023',
  '12/10/2023'
),
(
  2,
  30.50,
  200.00,
  7,
  3,
  '11/6/2000',
  '11/10/2000'
),
(
  2,
  12.30,
  40.00,
  3,
  4,
  '10/6/2000',
  '12/12/2000'
),
(
  3,
  6.99,
  30.96,
  2,
  5,
  '1/1/2005',
  '2/2/2005'
),
(
  3,
  9.99,
  24.20,
  5,
  6,
  '4/6/2024',
  '6/22/2024'
),
(
  4,
  15.10,
  40.00,
  2,
  7,
  '11/6/2020',
  '11/10/2020'
),
(
  4,
  23.25,
  50.00,
  1,
  8,
  '1/23/2001',
  '2/1/2001'
);


INSERT INTO ratings(rating, listing_id, user_id)
VALUES(
  4.3,
  1,
  1
),
(
  3.8,
  2,
  1
),
(
  2.9,
  3,
  1
),
(
  5.0,
  1,
  2
),
(
  3.2,
  2,
  2
),
(
  0.7,
  3,
  2
),
(
  2.9,
  1,
  3
),
(
  4.8,
  2,
  3
),
(
  3.7,
  3,
  3
),
(
  1.7,
  1,
  4
),
(
  4.0,
  2,
  4
),
(
  3.0,
  3,
  4
),
(
  4.9,
  4,
  1
),
(
  3.4,
  5,
  2
),
(
  2.8,
  6,
  3
),
(
  1.6,
  7,
  4
);

INSERT INTO reviews(review, listing_id, user_id)
VALUES(
  'Great car, clean and safe. Loved it',
  1,
  1
),
(
  'Bit worse than last time but still worth it',
  1,
  1

),
(
  'Too overpriced in my opinion',
  1,
  1

),
(
  'Its a decent place to stay for a night',
  1,
  4

),
(
  'Very dirty, terrible noisy neighbourhood, please DO NOT rent this van',
  2,
  2

),
(
  'Noisy neighbourhood with constant fireworks and very insecure',
  2,
  3

),
(
  'Would 1000% recommend this van and host if looking for a place in the area',
  7,
  1

),
(
  'I would suggest you look into other options first before opting for this',
  11,
  3
);