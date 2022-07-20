-- SEED File
-- Create mock users
-- Create mock listings

INSERT INTO users (username, firstName, lastName, email, password, gender)
VALUES (
  'jbosire',
  'Joram',
  'Bosire',
  'jbosire@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male'

), 
(
  'afakih',
  'Ammar',
  'Fakih',
  'afakih@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male'
),
(
  'votieno',
  'Vernon',
  'Otieno',
  'votieno@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'male'
),
(
  'etsehay',
  'Edilawit',
  'Tsehay',
  'etsehay@salesforce.com',
  '$2b$13$/VSX0UPEI0LZ8ubBpm3z6OYT1RfOAFvYiF5nyY4UqmiCO2LYW/1fS',
  'female'
);