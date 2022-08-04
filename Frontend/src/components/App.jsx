import React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import apiClient from '../services/apiClient';
import LandingPage from './LandingPage';
import Login from './Login';
import Listings from './Listings';
import Register from './Register';
import CreateListing from './CreateListing';
import ListingDetails from './ListingDetails';
import EditListing from './EditListing';
import BookListing from './BookListing';

<<<<<<< HEAD
import NotFound from "./notFound";
import { Navbar } from "./Navbar";
import User from "./User";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
=======
import NotFound from './notFound';
import { Navbar } from './Navbar';
import User from './User';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ActiveOrders from './UsersProfile/ActiveOrders';
import PastOrders from './UsersProfile/PastOrders';
import PastListings from './UsersProfile/PastListings';
import Reviews from './UsersProfile/Reviews';
import EditUser from './UsersProfile/EditUser';
>>>>>>> main

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
<<<<<<< HEAD
=======
  const [isLoading, setIsLoading] = useState(true);
>>>>>>> main
  const [error, setError] = useState(null);
  //const { user, setUser } = useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      console.log("user info: ", data);
      if (data) {
        setUser(data.user);
      }
      if (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    setIsLoading(true);
    const token = localStorage.getItem('vanlyfe_token');
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <Box>
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={user ? <Listings /> : <LandingPage />} />
<<<<<<< HEAD
          <Route
            path="/user/:id"
            element={<User user={user} setUser={setUser} />}
          />
=======
          <Route path="/user/:id" element={<User />} />
>>>>>>> main
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<Register user={user} setUser={setUser} />}
          />
          <Route path="/listings" element={<Listings />} />
          <Route
            path="/createlisting"
            element={<CreateListing user={user} isLoading={isLoading}/>}
          />
          <Route path="/listing/:id/book" element={<BookListing />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/listing/:id/edit" element={<EditListing />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
