# Project Plan

Pod Members: **Ammar Fakih, Joram Bosire, Edilawit Tsehay, Vernon Otieno**

## Problem Statement and Description

Problem Statement: People have few options when it comes to finding affordable housing in urban areas in the United States.

Description: 

The main purpose of our project is to provide an affordable housing option for people staying in the city. Our product allows for people to rent their car to others.

How it works: Enter a location and date and browse thousands of cars shared by local hosts. Book online, choose a protection plan, and say hi to your host! Cancel for free up to 24 hours before your trip. Have the car delivered or pick it up from your host. Once you are done with your stay, leave a helpful review.


## User Roles and Personas

User Roles

- Renter: a person who wants a place to rent

- Host: a person who would like to rent out their vehicle to make some extra cash.

Personas

1. Renter: Jacob is a young man in his early twenties studying at a community college. He lives in San Francisco and cannot afford to pay rent so he has been couch-surfing at his friends’ apartments. He would love to have his own place to stay at a low cost.

2. Renter: Rachel is traveling across California and needs a low cost place to stay for the night during her short transit through San Francisco. 

3. Host: Anna is a resident of San Francisco who has a car but mostly relies on
public transportation to and from work. He wants to earn extra money from his car which sits idle most of the time.

4. Host: Donald operates a trucking company, he is looking to rent out his trucks tot diversify his earnings whenever the trucking business is slow



## User Stories

### Week 6 Milestone: Planning
#### Create Wireframe  
- As a dev, I want to be added to the figma file as a collaborator so that I can work on the wireframe.  
- As a dev, I want to have access to the general app layout so that I can plan out my workflow. 
- As a dev, I want to see the flow of the app so that I can program the site to match.  
#### Define Endpoints  
- As a backend developer, I want to create endpoints to retrieve, post, or update data in the database so that they can be used where required in the frontend    
#### Document Data Models  
- As a backend dev, I want to know what data is being stored so that I can create the models.  
- As a backend dev, I want to know the types of the data being stored so that I can update the models accordingly.  
- As a backend dev, I want to have a description of each data being stored so that I can update the models accordingly.  

### Week 7 Milestone: Front End Dummy Grid
#### Initialize react project frontend  
- As a fr dev, I want the react project to be created so that I can begin implementing features.
- As a fr dev, I want the necessary dependencies to be defined in the project.json file so that I can use them to add features.
- As a fr dev, I want the initial jsx files to be created so that I can see the structure of the project.  
#### Create dummy listing grid    
- As a backend developer, I want to create initial seed data for different models so that it can be displayed on the dummy grid
- As a frontend developer, I want to create the layout of the listing grid so that the dummy data can be displayed  
#### Create website stuff  
- As a user, I want to see a website landing page so that I can know what the app deals with and how to use it
- As a user, I want to use a navbar to navigate to the pages on the website.
- As a user, I want to see a footer to find relevant information and links like company name, email, and social media.  
### (UNFINISHED) Week 8 Milestone: Users can create and book listings   
#### Create account  
- As a customer, I want to be able to create an account to book or list a vehicle.
- As a user, I want to be able to login to view my profile and access all the functionalities of the website.  
#### User Profile
  - As a user, I want to be able to view my profile details 
  - As a user, I want to be able to update my profile so that my details are up to date
  - As a user, I want to be able to view my past orders and listings I've created
#### Authentication
   - As a customer, I want to be able to create an account to book or list a vehicle.
   - As a user, I want to be able to login to view my profile and access all the functionalities of the website.

#### Create listings   
- As a user, I want to be able to navigate to a page with a form so that I can add a new listing to my profile
- As a user, i want to be able to create and post a new listing with relevant information so that it can be displayed on my page
- As a backend developer, I want to be able to persist new listing data into my database so that it can be accessed later if necessary


## Pages/Screens

- Landing Page
- Grid
- Listing Page
- Booking Page
- Booking Finished
- Create Listing
- User Profile
- Edit Profile
- Login
- Signup
- Create Account
- Forgot Password
- Reset Password

Wireframe:  
[Figma Wireframe](https://www.figma.com/file/SRERZMi2t2Z39aW8wobso7/Van-Lyfe?node-id=72%3A26893)  

[Landing Page](./pictures/Landing&#32;Page.png)  
[Grid Page](./pictures/Grid&#32;Page.png)  
[Listing Page](./pictures/Listing&#32;page.png)  
[Profile Page](./pictures/Profile&#32;Page&#32;(User&#32;Active&#32;Listing).png)  


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

**LISTINGRATINGS**
| Column name | Type | Description |
|-----------|-------|-------|
| id  | integer |Primary key |
| rating | float | listing rating |
| listing_id | integer | foreign key to listing table |
| user_id | integer | foreign key to user table |
| createdAt | timestamp | Time rating was created |

**USERRATINGS**
| Column name | Type | Description |
|-----------|-------|-------|
| id  | integer |Primary key |
| rating | float | user rating |
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
|**/listing** | /best | Read |GET | Return the 4 best rated listings to display on website|
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
