import React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './LandingPage';
import Login from './Login';
import Listings from './Listings';
import Register from './Register';
import CreateListing from './CreateListing';
import ListingDetails from './ListingDetails';
import EditListing from './EditListing';

export default function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/createlisting" element={<CreateListing />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/listing/:id/edit" element={<EditListing />} />"
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
