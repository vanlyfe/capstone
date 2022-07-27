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
import { Navbar } from './Navbar';
import User from './User';

export default function App() {
  //const [isLogin, setIsLogin] = useState(false);
  //const [user, setUser] = userState({name: "John Doe"})
  // const { user, setUser } = useAuthContext();

  // const handleLogout = async () => {
  //   await apiClient.logoutUser();
  //   setUser({});
  //   setError(null);
  // };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { data, error } = await apiClient.fetchUserFromToken();
  //     if (data) {
  //       setUser(data.user);
  //     }
  //     if (error) {
  //       setError(error);
  //     }
  //   };

  //   const token = localStorage.getItem("vanlyfe_token");
  //   if (token) {
  //     apiClient.setToken(token);
  //     fetchUser();
  //   }
  // }, [setUser]);

  return (
    <Box>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user/:id" element={<User />} />
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
