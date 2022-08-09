import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import logo from "../../assets/Logo2.svg";
import Container from "@mui/material/Container";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";
import "../App.css";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Vanlyfe
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = createTheme();

export default function ForgotPasswordConfirm(props) {
  const [error, setError] = useState(null)
  return (
    <div className="register">
      <Box>
        {/* <ThemeProvider theme={theme}> */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={logo} />
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>

            {error && <span className="error">{error}</span>}

            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Confirm your password"
                    type="password"
                    id="passwordConfirm"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Confirm
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <a href="/login" variant="body2">
                    Back to sign in?
                  </a>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
        {/* </ThemeProvider> */}
      </Box>
    </div>
  );
}
