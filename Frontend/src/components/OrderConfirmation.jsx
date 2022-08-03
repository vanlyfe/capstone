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
import { CheckBoxOutlineBlankSharp, ThumbUp } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// my imports

//import DatePicker from "./DatePicker";
//import DateRange from "./DateIn";
import DateIn from "./DateIn";
import DateOut from "./DateOut";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

// table imports

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ListSubheader from "@mui/material/ListSubheader";

export default function OrderConfirmation() {
  return (
    <Box
      sx={{
        height: 900,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid sx={{ width: "60%", height: "100%" }}>
        <Box>
          <Typography
            sx={{
              color: "#1e1e1f",
              fontWeight: 300,
              fontSize: 20,
            }}
          >
            Thank you Vernon, your request has been sent successfully!
          </Typography>
        </Box>
        <Box sx={{justifyContent:"right"}}>
          <Button
            variant="contained"
            size="medium"
            component={Link}
            to="/listing/:id"
            sx={{ mt: 2, ml: 2, mr: 2 }}
          >
            Edit Request
          </Button>
        </Box>
        <Box>
          <List
            sx={{ width: "100%", bgcolor: "red" }}
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Renter Details
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemText primary="NAME: Vernon Otieno" />
            </ListItem>
            <ListItem>
              <ListItemText primary="PHONE NUMBER: 7737549759" />
            </ListItem>
            <ListItem>
              <ListItemText primary="EMAIL: vernon@salesforce.com" />
            </ListItem>
            <ListItem>
              <ListItemText primary="DATES: 1/1/2022 - 7/7/2022" />
            </ListItem>
          </List>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Order Details
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Price/Night</TableCell>
                  <TableCell align="right">$20</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>No of guests</TableCell>
                  <TableCell align="right">3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>No of Nights</TableCell>
                  <TableCell align="right">7</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell>Subtotal</TableCell>
                  <TableCell align="right">$140</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">$20</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell align="right">$160</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="medium"
            component={Link}
            to="/listings"
            sx={{ mt: 2, ml: 2, mr: 2 }}
          >
            Continue Lyfeing
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
