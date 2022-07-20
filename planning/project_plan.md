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

**ORDERS**
- user_id
- created_at
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
- created_at

**USERRATINGS**
- rating
- user_id
- created_at

**REVIEWS**
- review
- listing_id
- user_id
- created_at



## Endpoints

**/auth**

- POST. /login - authenticates and logs in existing user
- POST. /register - registers a new user
- GET. /me - gets an authenticated user's details

**/update**

**/listing**

**/rating**

**/review**

**/order**

***Don't forget to set up your Issues, Milestones, and Project Board!***
