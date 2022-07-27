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
      {/* <Link>
        <h3>{mainLabel}</h3>{" "}
      </Link> */}
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
       // position: "fixed",
        bottom: 0,
        // backgroundColor: (theme) =>
        //   theme.palette.mode === "light"
        //     ? theme.palette.grey[200]
        //     : theme.palette.grey[800],
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
        <Box>
          <Link href="/Register">
            <h2 style={{ color: "white", textDecoration: "none" }}>Renters</h2>
          </Link>
          <FooterColumn
            //   mainLabel= "Renters"
            links={[
              "Search for a Vehicle",
              "How does it work?",
              "Help/ FAQ",
              "Cancellation policy",
            ]}
          />
        </Box>
        <Box>
          <Link href="/Listings">
            <h2 style={{ color: "white", textDecoration: "none" }}>Hosts</h2>
          </Link>
          <FooterColumn
            //   mainLabel="Hosts"
            links={[
              "List your Vehicle",
              "How does it work?",
              "Help/ FAQ",
              "Cancellation policy",
            ]}
          />
        </Box>
        <Box>
          <Link href="/">
            <h2 style={{ color: "white", textDecoration: "none" }}>
              Our Company
            </h2>
          </Link>
          <FooterColumn
            //   mainLabel="Our Company"
            links={[
              "About us",
              "Terms of use and privacy policy",
              "Contact Us",
            ]}
          />
        </Box>
        <Box>
          <Link href="/">
            <h2 style={{ color: "white", textDecoration: "none" }}>Socials</h2>
          </Link>
          <FooterColumn
            //   mainLabel="Socials"
            links={["Instagram", "Twitter", "LinkedIn", "YouTube"]}
          />
        </Box>
      </Grid>
      <Copyright />
    </Box>
  );
}
