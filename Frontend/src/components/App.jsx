import React from "react";
import Box from "@mui/material/Box";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import apiClient from "../services/apiClient";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Listings from "./Listings";
import Register from "./Register";
import CreateListing from "./CreateListing";
import ListingDetails from "./ListingDetails";
import OrderConfirmation from "./OrderConfirmation";
import EditListing from "./EditListing";
import EditOrder from "./EditOrder";

import NotFound from "./NotFound";
import { Navbar } from "./Navbar";
import User from "./User";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ForgotPasswordConfirm from "./ForgotPassword/forgotPasswordConfirm";
import ForgotPasswordEmail from "./ForgotPassword/ForgotPasswordEmail";
import ResetError from "./ResetError";
import Terms from "./Terms";
export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
      setIsLoading(false);
    };

    setIsLoading(true);
    const token = localStorage.getItem("vanlyfe_token");
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
          <Route
            path="/user/:id"
            element={<User user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<Register user={user} setUser={setUser} />}
          />
          <Route path="/terms" element={<Terms />} />
          <Route path="/listings" element={<Listings user={user} setUser={setUser}/>} />
          <Route
            path="/orderconfirmation/:id/:order_id"
            element={<OrderConfirmation />}
          />
          <Route
            path="/createlisting"
            element={<CreateListing user={user} isLoading={isLoading} />}
          />

          <Route
            path="/order/:id/edit"
            element={<EditOrder user={user} setUser={setUser} />}
          />
          <Route path="/listing/:id" element={<ListingDetails user={user} />} />
          <Route
            path="/listing/:id/edit"
            element={<EditListing user={user} setUser={setUser} />}
          />
          <Route path="/passwordemail" element={<ForgotPasswordEmail />} />
          <Route path="/passwordconfirm" element={<ForgotPasswordConfirm />} />
          <Route path="/reseterror" element={<ResetError />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
