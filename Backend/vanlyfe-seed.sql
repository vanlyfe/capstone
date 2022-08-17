INSERT INTO users (username, firstName, lastName, email, password, gender, image_url, birthdate)
VALUES (
  'jbosire',
  'Joram',
  'Bosire',
  'jbosire@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male',
  'https://a.cdn-hotels.com/gdcs/production92/d1580/9a28fc70-9bea-11e8-a1b5-0242ac110053.jpg',
  '2000-07-05T07:00:00.000Z'
), 
(
  'afakih',
  'Ammar',
  'Fakih',
  'jbosire@vassar.edu',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male',
  'https://www.fodors.com/wp-content/uploads/2022/04/jake-blucker-8LlJNFLTEm0-unsplash.jpg',
  '2000-07-05T07:00:00.000Z'
),
(
  'votieno',
  'Vernon',
  'Otieno',
  'votieno@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male',
  'https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty_16x9.jpg',
  '2000-07-05T07:00:00.000Z'
),
(
  'etsehay',
  'Edilawit',
  'Tsehay',
  'etsehay@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'female',
  'https://i.natgeofe.com/n/0652a07e-42ed-4f3d-b2ea-0538de0c5ba3/seattle-travel_3x2.jpg',
  '2000-07-05T07:00:00.000Z'
),
(
  'nosborne',
  'Norman',
  'Osborne',
  'afakih@hmc.edu',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male',
  'https://preview.redd.it/8nw85fig8g381.jpg?width=640&crop=smart&auto=webp&s=a892131c60ec4281b22dc38ae4c3947abd9c8445',
  '2000-07-05T07:00:00.000Z'

),
(
  'pparker',
  'Peter',
  'Parker',
  'afakih@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male',
  'https://assets.nationbuilder.com/columbia222/pages/308/attachments/original/1458870011/spiderman.jpg?1458870011',
  '2000-07-05T07:00:00.000Z'

);


INSERT INTO listings(user_id, price, location, max_accomodation, image_url, make, model, year, description, fees)
VALUES (
  1,
  20.99,
  'San Francisco',
  3,
  'https://media.ed.edmunds-media.com/ford/transit-passenger-van/2020/oem/2020_ford_transit-passenger-van_passenger-van_350-hd-xlt-high-roof_fq_oem_1_1600.jpg',
  'Ford',
  'Transit',
  2020,
  '5 Month old Ford, clean and in great condition, driving around not allowed',
  4.5

),
(
  1,
  15.99,
  'San Diego',
  1,
  'https://static.tcimg.net/vehicles/primary/122f4b2eb5fe71e0/2022-GMC-Savana_Cargo_Van-silver-full_color-driver_side_front_quarter.png',
  'GMC',
  'Savana Cargo Van',
  2022,
  'Clean 3 year old van',
  4

),
(
  1,
  25.00,
  'San Mateo',
  2,
  'https://www.autoindustriya.com/image.php?src=/images/posts/post15204.jpg&w=720&s=1',
  'Mazda',
  'Scrum',
  2019,
  'Clean spacious vehicle, references available',
  5.99

),
(
  2,
  39.50,
  'Menlo Park',
  8,
  'https://static.foxbusiness.com/foxbusiness.com/content/uploads/2021/01/RV.jpg',
  'Mazda',
  'RV',
  2021,
  'Large RV, able to host many people',
  10.5

),
(
  2,
  12.05,
  'Newark',
  3,
  'https://i.pinimg.com/originals/40/9b/ef/409bef61f2de4c08147cb57819d12279.jpg',
  'Volvo',
  'Renegade',
  2022,
  'Recently purchased vehicle in a friendly neighbourhood',
  4.3

),
(
  2,
  15.99,
  'Los Angeles',
  3,
  'https://www.renderhub.com/creator-3d/mitsubishi-express-spaceclass-2020/mitsubishi-express-spaceclass-2020-01.jpg',
  'Mitsubishi',
  'Express',
  2022,
  'Latest mitsubishi in the market, clean and hospitable',
  7.8

),
(
  3,
  35.99,
  'Seattle',
  1,
  'https://i.insider.com/5ee0eb89988ee36e5b0ff334?width=700',
  'Mercedes',
  'Sprinter',
  2022,
  'Sleek benz for a sleek customer',
  6.55

),
(
  3,
  29.99,
  'Nairobi',
  3,
  'https://cdn.motor1.com/images/mgl/Vwx67/s3/porsche-van.webp',
  'BMW',
  'Alfa Romeo',
  2022,
  'If you like sleeping on cosy seats at an affordable price, this is the home for you',
  3

),
(
  3,
  9.99,
  'Santa Cruz',
  5,
  'https://cdn.motor1.com/images/mgl/1mx49/s1/1986-toyota-new-world-rv-camper-driver-side.jpg',
  'Toyota',
  'Camper',
  2020,
  'Clean, affordable toyota. Meals may be provided',
  2.0

),
(
  4,
  23.00,
  'Oakland',
  3,
  'https://hips.hearstapps.com/hmg-prod/images/2022-chrysler-voyager-mmp-1-1633445515.jpg',
  'Toyota',
  'Sienna',
  2022,
  'Clean, affordable toyota',
  6.00

),
(
  4,
  17.80,
  'Poughkeepsie',
  5,
  'https://i.ytimg.com/vi/2Ldt4H1VBwY/maxresdefault.jpg',
  'Toyota',
  'HIACE',
  2022,
  'Cozy toyota for anyone',
  5.99

),
(
  4,
  42.00,
  'Boston',
  8,
  'https://i.gaw.to/vehicles/photos/40/19/401988-2020-chrysler-pacifica.jpg',
  'Chrystler',
  'Pacifica',
  2020,
  '10 year old chrystler, clean and still in great condition',
  10.00

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
  11,
  3
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

INSERT INTO reviews(review, listing_id, user_id, rating_id)
VALUES(
  'Great car, clean and safe. Loved it',
  1,
  2,
  4
),
(
  'Bit worse than last time but still worth it',
  1,
  3,
  7

),
(
  'Very dirty, terrible noisy neighbourhood, please DO NOT rent this van',
  2,
  2,
  5

),
(
  'Noisy neighbourhood with constant fireworks and very insecure',
  2,
  3,
  8

),
(
  'Would 1000% recommend this van and host if looking for a place in the area',
  7,
  4,
  16

),
(
  'I would suggest you look into other options first before opting for this',
  11,
  3,
  2
);

INSERT INTO favorites(listing_id, user_id)
VALUES(
  10,
  1
),
(
  5,
  1
),
(
  9,
  2
),
(
  2,
  2
),
(
  3,
  3
),
(
  11,
  3
),
(
  4,
  4
),
(
  8,
  4
);
