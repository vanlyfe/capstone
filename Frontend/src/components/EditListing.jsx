import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Avatar,
  Grid,
  Autocomplete,
  Button,
  TextField,
  Link,
} from "@mui/material";

import apiClient from "../services/apiClient";

import SnackbarContent from "@mui/material/SnackbarContent";
import variables from "../assets/variables.js";


export default function EditListing(props) {
  const [success, setSuccess] = React.useState(false);
  const [value, setValue] = React.useState();
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    birthdate: "",
    gender: "",
    phone: "",
    location: "",
    bio: "",
    email: "",
  });
  const [errors, setErrors] = React.useState({});


  const locations = variables.locations;
  const models = variables.makes;

  const handleOnCancel = () => {
    props.setEditProfile(null);
  };

  const handleOnSubmit = async () => {
    setErrors((e) => ({ ...e, form: null }));
    const { data, error } = await apiClient.updateUser(form, props.user.id);

    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }

    if (data?.user) {
      props.setUser(data.user);

      setSuccess(true);
      setTimeout(function () {
        setSuccess(false);
        props.setEditProfile(null);
      }, 2000);
    }
  };

  const handleOnInputChange = (event) => {
   
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  console.log(form);
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
     
      <Link href={props.user ? "/user/" + props.user.id : "/login"}>
        <ArrowBackIcon className="arrowBack" sx={{ fontSize: 60 }} />
      </Link>

    

      <Grid
        sx={{
          width: 250,
          ml: 30,
          mt: 5,
          fontSize: 30,
          fontWeight: 400,
        }}
      >
        <Box
          sx={{
            ml: 3,
            fontSize: 30,
            fontWeight: 400,
          }}
        >
          Edit Listing{" "}
        </Box>
        <Box>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 200, height: 200, mt: 3, mb: 1 }}
          />{" "}
        </Box>
       
        <Button variant="text" href="/user/:id/activeListing" sx={{ ml: 4 }}>
          Upload Photo
        </Button>
      </Grid>

      <Grid sx={{ width: "100%", ml: 2, mt: 15 }}>
        {errors.form && <span className="editUserError">{errors.form}</span>}
        <SnackbarContent
          message="Edited successfully!"
          sx={{
            ml: "50px",

            mb: "50px",
            display: success ? "null" : "none",
            width: "60px",
            fontSize: 20,
            height: 60,
          }}
        />

        <Box>
          <Box sx={{ ml: 2, mb: 7 }}>
            <TextField
              id="filled-multiline-flexible"
              label="First Name"
              name="firstName"
              maxRows={4}
              onChange={handleOnInputChange}
              variant="filled"
              sx={{ width: 240, mr: 3, mb: 5 }}
            />
            <TextField
              id="filled-multiline-flexible"
              label="Last Name"
              name="lastName"
              maxRows={4}
              onChange={handleOnInputChange}
              variant="filled"
              sx={{ width: 240, mr: 3, mb: 5 }}
            />{" "}
            <TextField
              id="filled-multiline-flexible"
              label="Email"
              name="email"
              onChange={handleOnInputChange}
              maxRows={4}
            
              variant="filled"
              sx={{ width: 500, mr: 3, mb: 5 }}
            />{" "}
            <Grid
              container
              spacing={4}
              justifyItems="center"
              style={{ marginTop: "2px", marginBottom: "40px" }}
            >
              <TextField
                id="filled-multiline-flexible"
                label="Username"
                name="username"
                onChange={handleOnInputChange}
                maxRows={4}
                //     onChange={handleChange}
                variant="filled"
                sx={{ width: 240, mr: 2.5, ml: 4 }}
              />{" "}
              <Autocomplete
                disablePortal
                id="locations-auto-complete"
                options={["Male", "Female", "Do not specify"]}
                sx={{ width: 240, background: "rgba(0, 0, 0, 0.06)" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Gender"
                    name="gender"
                    onChange={handleOnInputChange}
                    onSelect={handleOnInputChange}
                  />
                )}
              />
            </Grid>
            <Grid
              container
              spacing={4}
              justifyItems="center"
              style={{ marginTop: "2px", marginBottom: "20px" }}
            >
              <TextField
                id="filled-multiline-flexible"
                label="Date of Birth"
                name="birthdate"
                type="date"
                onChange={handleOnInputChange}
                variant="filled"
                sx={{ width: 240, mr: 2.5, ml: 4 }}
              />
            
              <TextField
                id="filled-multiline-flexible"
                label="Phone Number"
                name="phone"
                maxRows={4}
                onChange={handleOnInputChange}
                type="number"
               
                variant="filled"
                sx={{ width: 240, mb: 5 }}
              />{" "}
            </Grid>
            <TextField
              id="filled-multiline-flexible"
              label="City"
              name="location"
              onChange={handleOnInputChange}
              maxRows={4}
             
              variant="filled"
              sx={{ width: 500, mr: 3 }}
            />{" "}
            <TextField
              id="filled-multiline-static"
              label="Describe Yourself"
              name="bio"
              onChange={handleOnInputChange}
              multiline
              rows={4}
              variant="filled"
              sx={{ width: 500, mt: 5 }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", ml: 15 }}>
            <Button
              variant="contained"
              onClick={handleOnSubmit}
              disabled={
                form.firstName === "" &&
                form.lastName === "" &&
                form.username === "" &&
                form.birthdate === "" &&
                form.gender === "" &&
                form.location === "" &&
                form.phone === "" &&
                form.bio === "" &&
                form.email === ""
              }
              sx={{ mt: 1, mb: 1, ml: 1 }}
            >
              Accept Changes
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleOnCancel}
              sx={{ mt: 1, mb: 1, ml: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Grid>
     
    </Grid>
  );
}

