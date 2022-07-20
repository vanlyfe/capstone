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
- id              
- password       
- firstName    
- lastName     
- email          
- username      
- image_url     
- location      
- birthdate     
- createdAt      
- updatedAt     
- gender
- bio         

**LISTINGS**
- user_id
- price
- location
- max_accomodation
- model
- description
- image_url
- image_url2
- image_url3
- image_url4
- image_url5
- createdAt
- updatedAt

**ORDERS**
- user_id
- createdAt
- fees
- taxes
- total
- guests
- dates
- listing_id

**LISTINGRATINGS**
- rating
- listing_id
- user_id
- createdAt

**USERRATINGS**
- rating
- user_id
- created_at

**REVIEWS**
- review
- listing_id
- user_id
- createdAt
- updatedAt



## Endpoints

**/auth**

- POST. /login - authenticates and logs in existing user
- POST. /register - registers a new user
- GET. /me - gets an authenticated user's details

**/update**

- PUT. /user/:userId - for user updating their profile
- PUT. /listing/:listingId - for user to update one of their listings 
- PUT. /review/:reviewId - for user to update a review on a listing

**/listing**

**/rating**

**/review**

**/order**

***Don't forget to set up your Issues, Milestones, and Project Board!***
