import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Avatar, Grid, Button, TextField, Link } from "@mui/material";
import Typography from "../LandingPage/Typography";
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MuiPhoneNumber from "material-ui-phone-number";
//import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function EditUser() {
  const [value, setValue] = React.useState();
  // const [value, setValue] = React.useState<Date | null>(new Date());

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  function handleOnChange(value) {
    this.setState({
      phone: value,
    });
  }
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {/* <Grid> */}
      <Link href="/user/:id/activeListing">
        <ArrowBackIcon sx={{ fontSize: 60 }} />
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
          Edit Profile{" "}
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
        <Box>
          <Box sx={{ ml: 1, mb: 5 }}>
            <TextField
              id="filled-multiline-flexible"
              label="First Name"
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
              variant="filled"
              sx={{ width: 240, mr: 3, mb: 5 }}
            />
            <TextField
              id="filled-multiline-flexible"
              label="Last Name"
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
              variant="filled"
              sx={{ width: 240, mr: 3, mb: 5 }}
            />{" "}
            <TextField
              id="filled-multiline-flexible"
              label="Email"
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
              variant="filled"
              sx={{ width: 500, mr: 3, mb: 5 }}
            />{" "}
            <TextField
              id="filled-multiline-flexible"
              label="Username"
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
              variant="filled"
              sx={{ width: 500, mr: 3, mb: 5 }}
            />{" "}
            <TextField
              id="filled-multiline-flexible"
              label="Gender"
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
              variant="filled"
              sx={{ width: 240, mr: 3, mb: 5 }}
            />
            <TextField
              id="filled-multiline-flexible"
              label="Date of Birth"
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
              variant="filled"
              sx={{ width: 240, mr: 3, mb: 5 }}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                 disableFuture
                label="Date of Birth"
                openTo="year"
                views={["year", "month", "day"]}
                 value={value}
                sx={{ width: 240, mr: 3, mb: 5 }}
              />
            </LocalizationProvider> */}
            {/* onChange={(newValue) => {
                setValue(newValue);
              }}
               renderInput={(params) => <TextField {...params} />}
            /> */}
            <MuiPhoneNumber
              variant="filled"
              defaultCountry={"us"}
              /* onChange={handleOnChange}  */
              sx={{ width: 500, mr: 3, mb: 5 }}
            />
            <TextField
              id="filled-multiline-flexible"
              label="City"
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
              variant="filled"
              sx={{ width: 240, mr: 3, mb: 5 }}
            />{" "}
            <TextField
              id="filled-multiline-flexible"
              label="State"
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
              variant="filled"
              sx={{ width: 240, mr: 3, mb: 5 }}
            />{" "}
            <TextField
              id="filled-multiline-static"
              label="Describe Yourself"
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="filled"
              sx={{ width: 500 }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", ml: 15 }}>
            <Button
              variant="contained"
              // color="success"
              sx={{ mt: 1, mb: 1, ml: 1 }}
            >
              Accept Changes
            </Button>
            <Button
              variant="contained"
              color="error"
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
