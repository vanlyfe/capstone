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

import { useNavigate, useParams } from "react-router-dom";
import SnackbarContent from "@mui/material/SnackbarContent";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";

export default function EditOrder(props) {
    const { id } = useParams();
  const [success, setSuccess] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState(null);

  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({
    fees: "",
    taxes: "",
    total: "",
    guests: "",
    endDate: new Date(),
    startDate: new Date(),
    
  });

  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const { data, error } = await apiClient.fetchOrder(id);
      if (error) {
        console.log(error);
      }

      if (data.order) {
        setOrderDetails(data.order[0]);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleOnCancel = () => {
    navigate("/user/" + props.user.id);
  };

  const handleOnSubmit = async () => {
    // setErrors((e) => ({ ...e, form: null }));
    // const { data, error } = await apiClient.updateListing(form, id);
    // if (error) {
    //   setErrors((e) => ({ ...e, form: error }));
    // }
    // if (data?.listing) {
    //   setSuccess(true);
    //   setTimeout(function () {
    //     setSuccess(false);
    //     navigate("/user/" + props.user.id);
    //   }, 2000);
    // }
  };

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  console.log("Form is", form);

  
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"

      // style={{ backgroundColor : "black" }}
      //   sx={{
      //     display: "flex",
      //     flexDirection: "row",
      //     justifyContent : "flex-end"

      //   }}
    >
      {errors.form && <span className="editUserError">{errors.form}</span>}
      <SnackbarContent
        message="Edited successfully!"
        sx={{
          //      ml: "50px",

          mb: "50px",
          display: success ? "null" : "none",
          width: "60px",
          fontSize: 20,
          height: 60,
        }}
      />
      <Box
        sx={{
          mt: 2,
          mb: 5,
          fontSize: 30,
          fontWeight: 400,
        }}
      >
        Edit Order{" "}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", mb: 3 }}>
        <Box sx={{ mt: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date in"
              name="startDate"
              value={form.startDate}
              onChange={(value, keyboardInputValue) => {
                setForm((f) => ({ ...f, startDate: value }));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ mt: 1, ml: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date out"
              name="endDate"
              value={form.endDate}
              onChange={(value, keyboardInputValue) => {
                setForm((f) => ({ ...f, endDate: value }));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
     
      <TextField
        id="filled-multiline-flexible"
        label="Guests"
        name="guests"
        onChange={handleOnInputChange}
        maxRows={4}
        type="number"
        variant="filled"
        sx={{ width: 240, mb: 4 }}
      />{" "}
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          variant="contained"
          onClick={handleOnSubmit}
          disabled={
            form.startDate === "" ||
            (!form.startDate && form.endDate === "") ||
            (!form.endDate && form.guests === "") 
          }
          sx={{ mr: 2 }}
        >
          Accept Changes
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleOnCancel}
          sx={{ ml: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Grid>
  );
}
