import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Box,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Collapse,
  IconButton,
  CardContent,
  Avatar,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { ThumbUp } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// my imports
//import DatePicker from "./DatePicker";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function OrderConfirmation() {
  return (
    <Box>
      <Grid
        sx={{
          //backgroundColor: "red",
          display: "flex",
          flexDirection: "rows",
          width: "100vw",
          height: 900,
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            //backgroundColor: "blue",
          }}
        >
          <Card sx={{ width: "100%", maxWidth: "100%", borderRadius: 0 }}>
            <CardMedia
              component="img"
              height="400"
              image="https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dm9sa3N3YWdlbiUyMHZhbnxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="Paella dish"
              sx={{
                ml: 5,
                mt: 5,
                mr: 2,
              }}
            />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", ml: 5 }}
            >
              <Typography
                sx={{
                  color: "#1e1e1f",
                  fontWeight: 300,
                  fontSize: 20,
                }}
              >
                Vernon Otieno
              </Typography>

              <Typography
                sx={{
                  //fontFamily: "sans-serif",
                  color: "#1e1e1f",
                  //fontWeight: 300,
                  //fontSize: 20,
                  mt:2,
                }}
              >
                San Manteo,CA
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Rating name="read-only" value={5} readOnly />

                <Typography
                  sx={{
                    //fontFamily: "sans-serif",
                    //color: "#1e1e1f",
                    //fontWeight: 300,
                    //fontSize: 20,
                    ml: 20,
                   
                  }}
                >
                  $ 20.00
                </Typography>
              </Box>
            </CardContent>
          </Card>{" "}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            //backgroundColor: "blue",
          }}
        ></Grid>
      </Grid>
    </Box>
  );
}
