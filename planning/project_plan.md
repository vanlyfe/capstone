# Project Plan

Pod Members: **Add Pod Members Names**

## Problem Statement and Description

Insert the latest summary of your problem statement and app description.

## User Roles and Personas

Include the most up-to-date user roles and personas.

## User Stories

List the current user stories you will implement.

## Pages/Screens

List all the pages and screens in the app. Include wireframes for at least 3 of them.

## Data Model
**USER**

| Column name | Type | Description |
| ------------|------|------------ |
|  id         | integer    |  Primary key   |
|  password   |  text    |    User's password         |
| firstName   |  text    |     User's first name        |
| lastName    |  text    |   User's last name          |
| Email       |   text   |     User's email        |
| username    |  text    |  User's username          |
| image_url   |  text    |  User's profile picture           |
| location    |  text    |   User's location          |
| birthdate   |  date    |   User's birthday    |
|createdAt     |  timestamp  |  Time profile was created       |
|updatedAt     |    timestamp  |    Timestamp of latest profile update     |
| gender      |     text  |    User's gender     |
| bio         |    text   |  Short user bio   | 

**LISTINGS**

| Column name | Type | Description |
|-----------|-------|-------|
| id  | integer |Primary key |
| user_id | integer | foreign key to user table |
| price | float | rent price per night  |
| location | text | location of the listing |
| max_accomodation | integer | maximimum number of car occupants |
| model | text | type of vehicle |
| description | text | description of vehicle and listing policies |
| image_url | text | first image of vehicle |
| image_url2 | text | second image of vehicle |
| image_url3 | text | third image of vehicle |
| image_url4 | text | fourth image of vehicle |
| image_url5 | text | fifth image of vehicle |
| createdAt | timestamp | Time listing was created |
| updatedAt | timestamp | Time of latest listing update |
| fees    | float | Fees imposed on listing |

**ORDERS**
| Column name | Type | Description |
|-----------|-------|-------|
| id  | integer |Primary key |
| user_id | integer | foreign key to user table |
| createdAt | timestamp | Time order was created |
| updatedAt | timestamp | Time of latest order update |
| fees | float | Additional fees paid |
| taxes | float | Taxes paid for order| 
| total | float | total amount paid |
| guests | integer | number of guests |
| dates | text | timeperiod vehicle was rented |
| listing_id | integer | foreign key to listing table |

**RATINGS**
| Column name | Type | Description |
|-----------|-------|-------|
| id  | integer |Primary key |
| rating | float | listing rating |
| listing_id | integer | foreign key to listing table |
| user_id | integer | foreign key to user table |
| createdAt | timestamp | Time rating was created |



**REVIEWS**
| Column name | Type | Description |
|-----------|-------|-------|
| id  | integer |Primary key |
| review | text | listing review provided |
| listing_id | integer | foreign key to listing table |
| user_id | integer | foreign key to user table |
| createdAt | timestamp | Time review was created |
| updatedAt | timestamp | Time of latest review update |


## Endpoints

Endpoint | Route |CRUD | HTTP Verb | Description |User stories |
|------|------|----|-----|-----|------|
| **/auth** | /login | Create | POST | Logs user into account |
| **/auth** | /register | Create | POST | Creates new user account |
| **/auth** | /me | Read | GET | Fetches authenticated user's details |
| **/auth** | /:userId | Update | PUT | Updates a user profile |
|**/auth** | /:userId | Delete | DELETE | Delete a user profile |
|**/listing** | / | Create | POST | creates a new listing |
|**/listing** | / | Read | GET | Return all the listings in the database |
|**/listing** | /user/:userId | Read | GET | Return all listings by a particular user |
|**/listing** | /:listingId | Read | GET | Return one particular listing |
|**/listing** | /:listingId | Delete | DELETE | Delete a listing |
|**/listing** | /:listingId | Update | PUT | Update a listing |
|**/rating** | /:listingId | Create | POST | Add rating for a listing |
|**/rating** | /:listingId | Read | GET | Get average rating for a listing |
|**/review** | /:listingId | Create | POST | Add review to listing |
|**/review** | /:listingId | Read | GET | Get a listing's reviews |
|**/review** | /:reviewId | Update | PUT | Update a posted review |
|**/review** | /:reviewId | Delete | DELETE | Delete a review |
|**/order** | / | Create | POST | Create a new order |
|**/order** | / | Read | GET | Get all the orders | 
|**/order** | /user/:userId | Read | GET | Get a user's orders |
|**/order** | /:orderId | Read | GET | Get a particular order |


***Don't forget to set up your Issues, Milestones, and Project Board!***
