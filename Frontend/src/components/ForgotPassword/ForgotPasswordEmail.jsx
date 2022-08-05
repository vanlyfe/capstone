import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/Logo2.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        to="https://mui.com/"
        style={{ textDecoration: "none" }}
      >
        vanlyfe
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = createTheme();

export default function ForgotPasswordEmail() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") < 1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "password") {
      if (event.target.value.length < 1) {
        setErrors((e) => ({ ...e, password: "Please enter your password." }));
      } else {
        setErrors((e) => ({ ...e, password: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.loginUser({
      email: form.email,
      password: form.password,
    });
    if (error) {
      setIsLoading(false);
      setErrors((e) => ({ ...e, form: error }));
    }

    if (data?.user) {
      props.setUser(data.user);
      setIsLoading(false);
      navigate(returnEndpoint);
      apiClient.setToken(data.token);
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <Box justifyContent="centre">
        {/* <ThemeProvider theme={theme}> */}

        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            component="form"
            noValidate
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={logo} />

            <Typography component="h1" variant="h5">
              Enter your email address and follow the instructions sent to your
              email
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleOnInputChange}
              autoComplete="email"
              autoFocus
            />

            <Button
              //   onClick={handleOnSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>

            <Grid item>
              <Link
                to="/register"
                variant="body2"
                style={{ textDecoration: "none" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>

            <Copyright sx={{ mt: 8, mb: 4 }} />

            {/* </ThemeProvider> */}
          </Box>
        </Container>
      </Box>
    </div>
  );
}
