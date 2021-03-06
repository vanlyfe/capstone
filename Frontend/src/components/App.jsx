
import React from "react";
import Box from "@mui/material/Box";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import apiClient from "../services/apiClient";
import LandingPage from './LandingPage';
import Login from './Login';
import Listings from './Listings';
import Register from './Register';
import CreateListing from './CreateListing';
import ListingDetails from './ListingDetails';
import EditListing from './EditListing';
import BookListing from './BookListing';

import NotFound from "./notFound";
import { Navbar } from './Navbar';
import User from './User';
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
 
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null)
  //const { user, setUser } = useAuthContext();

  

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);
      }
      if (error) {
        setError(error);
      }
    };

    const token = localStorage.getItem("vanlyfe_token");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    }
  }, [setUser]);

  return (
    <Box>
      <BrowserRouter>
        <Navbar user = {user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/login" element={<Login user = {user} setUser={setUser}/>} />
          <Route path="/register" element={<Register user = {user} setUser={setUser}/>} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/createlisting" element={<CreateListing />} />
          <Route path="/listing/:id/book" element={<BookListing />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/listing/:id/edit" element={<EditListing />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
