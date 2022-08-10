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
import variables from "../assets/variables.js";
import { useNavigate, useParams } from "react-router-dom";
import SnackbarContent from "@mui/material/SnackbarContent";

export default function EditUser(props) {
  const [success, setSuccess] = React.useState(false);
  const [value, setValue] = React.useState();
  const [form, setForm] = React.useState({
    image_url: "",
    location: "",
    max_accomodation: "",
    fees: "",
    price: "",
    description: "",
  });
  const [errors, setErrors] = React.useState({});


  const navigate = useNavigate();
  const { id } = useParams();

  const handleOnCancel = () => {
    navigate("/user/" + props.user.id);
  };

  const locations = variables.locations;

  const handleOnSubmit = async () => {
    setErrors((e) => ({ ...e, form: null }));
    const { data, error } = await apiClient.updateListing(form, id);

    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }

    

    if (data?.listing) {
      
      setSuccess(true);
      setTimeout(function () {
        setSuccess(false);
        navigate("/user/" + props.user.id);
        
      }, 2000);
    }
  };

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {/* <Grid> */}
      <Link href={"/user/" + props.user.id }>
        <ArrowBackIcon className="arrowBack" sx={{ fontSize: 60 }} />
      </Link>

      {/* </Grid> */}

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
        {/* <Typography sx={{ ml: 3 }}>Upload Photo</Typography> */}
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
            <Grid sx={{ display: "flex", flexDirection: "row", mb: 5 }}>
              <Autocomplete
                disablePortal
                id="locations-auto-complete"
                options={locations}
                sx={{ width: 240, background: "rgba(0, 0, 0, 0.06)", mr: 3 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location"
                    name="location"
                    onChange={handleOnInputChange}
                    onSelect={handleOnInputChange}
                  />
                )}
              />
              <TextField
                id="filled-multiline-flexible"
                label="Max accomodation"
                name="max_accomodation"
                maxRows={4}
                onChange={handleOnInputChange}
                variant="filled"
                type="number"
                sx={{ width: 240 }}
              />{" "}
            </Grid>

            <Grid
              container
              spacing={4}
              justifyItems="center"
              style={{ marginTop: "2px", marginBottom: "40px", marginLeft: 1 }}
            >
              <TextField
                id="filled-multiline-flexible"
                label="Fees"
                name="fees"
                onChange={handleOnInputChange}
                maxRows={4}
                type="number"
                variant="filled"
                sx={{ width: 240, mr: 3 }}
              />{" "}
              <TextField
                id="filled-multiline-flexible"
                label="Price"
                name="price"
                onChange={handleOnInputChange}
                maxRows={4}
                type="number"
                variant="filled"
                sx={{ width: 240 }}
              />{" "}
            </Grid>

            <TextField
              id="filled-multiline-static"
              label="Describe the car"
              name="description"
              onChange={handleOnInputChange}
              multiline
              rows={4}
              variant="filled"
              sx={{ width: 500 }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", ml: 15 }}>
            <Button
              variant="contained"
              onClick={handleOnSubmit}
              disabled={
                form.image_url === "" &&
                form.location === "" &&
                form.max_accomodation === "" &&
                form.fees === "" &&
                form.price === "" &&
                form.description === ""
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
      {/* <Grid sx={{ width: "50%", ml: 60, mt: 8 }}></Grid> */}
    </Grid>
  );
}
