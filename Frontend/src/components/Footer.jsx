import * as React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Link,
  CssBaseline,
} from "@mui/material";
//import Logo from "../assets/Logo1.png"

function Copyright() {
  return (
    <Typography>
      {"Copyright © Vanlyfe"} {new Date().getFullYear()}
      {" | All rights reserved"}
    </Typography>
  );
}

const FooterColumn = ({ mainLabel, links }) => {
  return (
    <div className="footer-column">
      {links.map((link, index) => (
        <p key={index}>{link}</p>
      ))}
    </div>
  );
};
export default function Footer() {
  return (
    <Box
      component="footer"
      px={{ xs: 3, s: 10 }}
      py={{ xs: 5, s: 10 }}
      sx={{
        display: "flex",
        flexDirection: "column",

        minWidth: "100vw",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        alignItems: "center",
        marginTop: "auto",
        bgcolor: "primary.main",
        color: "white",
        bottom: 0,
      }}
    >
      <Grid
        container
        direction="row"
        style={{
          marginBottom: 0,
          flexWrap: "wrap",

          justifyContent: "space-evenly",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <h2>Renters</h2>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Link
              href="/Listings"
              sx={{ mb: 2, color: "white", textDecoration: "none" }}
            >
              Search for a Vehicle
            </Link>
            <Link
              sx={{ mb: 2, color: "white", textDecoration: "none" }}
              href="/#howItWorks"
            >
              How does it work?
            </Link>
            <Link
              href="/#faq"
              sx={{ mb: 2, color: "white", textDecoration: "none" }}
            >
              Help/ FAQ
            </Link>
            <Link
              href="/Terms"
              sx={{ mb: 2, color: "white", textDecoration: "none" }}
            >
              {" "}
              Cancellation policy
            </Link>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <h2>Hosts</h2>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Link
              href="/createlisting"
              sx={{ mb: 2, color: "white", textDecoration: "none" }}
            >
              List your Vehicle{" "}
            </Link>
            <Link
              sx={{ mb: 2, color: "white", textDecoration: "none" }}
              href="/#howItWorks"
            >
              How does it work?
            </Link>
            <Link
              href="/#faq"
              sx={{ mb: 2, color: "white", textDecoration: "none" }}
            >
              Help/ FAQ
            </Link>
            <Link
              href="/Terms"
              sx={{ mb: 2, color: "white", textDecoration: "none" }}
            >
              {" "}
              Cancellation policy
            </Link>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <h2>Our Company</h2>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Link
              href="/#about"
              sx={{ mb: 2, color: "white", textDecoration: "none" }}
            >
              About us{" "}
            </Link>
            <Link
              href="/terms"
              sx={{ mb: 2, color: "white", textDecoration: "none" }}
            >
              Terms of use and privacy policy
            </Link>
            <Typography sx={{ mb: 2 }}>Contact Us</Typography>
          </Box>
        </Box>
        <Box>
          <h2>Socials</h2>
          <FooterColumn
            links={["Instagram", "Twitter", "LinkedIn", "YouTube"]}
          />
        </Box>
      </Grid>
      <Copyright />
    </Box>
  );
}
