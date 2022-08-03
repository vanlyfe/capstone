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
import DatePicker from "./DatePicker";
// used the separate calendars is instead of the datepicker
import DateIn from "./DateIn";
import DateOut from "./DateOut";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function ListingDetails() {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <Box>
      <Grid
        sx={{
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
          }}
        >
          <Card sx={{ width: "100%", maxWidth: "100%" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  V
                </Avatar>
              }
              title="Vernon Otieno"
              subheader="September 14, 2021"
            />
            <CardMedia
              component="img"
              height="400"
              image="https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dm9sa3N3YWdlbiUyMHZhbnxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="Paella dish"
            />
            <CardContent sx={{ display: "flex", flexDirection: "row" }}>
              {/* <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography> */}

              <Box>
                <Typography
                  sx={{
                    fontFamily: "sans-serif",
                    color: "#1e1e1f",
                    fontWeight: 300,
                    fontSize: 20,
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
                  <Typography
                    sx={{
                      fontFamily: "Arial",
                      color: "#1d3557",

                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    25 Reviews
                  </Typography>
                  <Rating name="read-only" value={3} readOnly />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Chalkduster, fantasy",
                    color: "003049",
                    fontWeight: 600,
                    fontSize: 40,
                  }}
                >
                  $200/Night
                </Typography>{" "}
                <Typography
                  sx={{
                    fontFamily: "Arial",
                    color: "#343a40",

                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  Thor Majestic Class C
                </Typography>{" "}
                <Typography
                  sx={{
                    fontFamily: "Arial",
                    color: "#bbd0ff",

                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  Sleeps 4
                </Typography>
              </Box>
              <Box>
                <BookmarkSharpIcon sx={{ justify: "end" }} />
              </Box>
            </CardContent>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontSize: 25,
                  mt: 3,
                  ml: 20,
                  //color: "white",
                  align: "center",
                }}
              >
                Contact Host
              </Typography>

              <Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    // sx={{ width: 200, height: 200 }}
                  />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}
                  >
                    Vernon Owenga
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    ml: 5,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Arial",
                      color: "#1d3557",

                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    25 Reviews
                  </Typography>
                  <Rating name="read-only" value={3} readOnly />
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 5 }}
                >
                  <LocalPhoneIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 5 }}
                  >
                    +1 773 754 9759
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 5 }}
                >
                  <MailOutlineIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 5 }}
                  >
                    vernon@gmail.com
                  </Typography>
                </Box>
              </Box>
              {/* <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  placeholder="First Name"
                  sx={{ ml: 2, mt: 2, mr: 2 }}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  placeholder="Last Name"
                  sx={{ ml: 10, mt: 2 }}
                />
              </Box>

              <TextField
                required
                id="outlined-required"
                label="Required"
                placeholder="email"
                sx={{ ml: 2, mt: 2, width: "80%" }}
              />
                <TextField
                required
                id="outlined-required"
                label="Required"
                placeholder="Phone"
                sx={{ ml: 2, mt: 2, width: "50%" }}
              />

              <Button
                variant="contained"
                size="medium"
                sx={{ mt: 2, ml: 2, mr: 2 }}
              >
                Message
              </Button> */}
            </Box>

            {/* <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep
                  skillet over medium-high heat. Add chicken, shrimp and
                  chorizo, and cook, stirring occasionally until lightly
                  browned, 6 to 8 minutes. Transfer shrimp to a large plate and
                  set aside, leaving chicken and chorizo in the pan. Add
                  pimentón, bay leaves, garlic, tomatoes, onion, salt and
                  pepper, and cook, stirring often until thickened and fragrant,
                  about 10 minutes. Add saffron broth and remaining 4 1/2 cups
                  chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with
                  artichokes and peppers, and cook without stirring, until most
                  of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                  medium-low, add reserved shrimp and mussels, tucking them down
                  into the rice, and cook again without stirring, until mussels
                  have opened and rice is just tender, 5 to 7 minutes more.
                  (Discard any mussels that don&apos;t open.)
                </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then
                  serve.
                </Typography>
              </CardContent>
            </Collapse> */}
          </Card>{" "}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: " column",
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <DatePicker /> */}
          {/* <Box sx={{mb:30}}>
            <Typography
              sx={{
                fontSize: 25,
                mt: 3,
                ml: 3,
                //color: "white",
                align: "center",
              }}
            >
              Request This Listing
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ mt: 10, ml: 5 }}>
                <Typography>From:</Typography>

                <DateIn />
              </Box>

              <Box sx={{ mt: 10, ml: 5 }}>
                <Typography>To:</Typography>
                <DateOut />
              </Box>
            </Box>
          </Box> */}
          {/* //commenting this box out */}
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //backgroundColor: "blue",
              //height: "40%",
              width: "60%",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          > */}

          <Typography
            sx={{
              fontSize: 25,
              mt: 3,
              ml: 3,
              //color: "white",
              align: "center",
            }}
          >
            Request This Listing
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              required
              id="outlined-required"
              label="First Name"
              placeholder="First Name"
              sx={{ ml: 10, mt: 5, mr: 2 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Last Name"
              placeholder="Last Name"
              sx={{ ml: 10, mt: 5 }}
            />
          </Box>

          <TextField
            required
            id="outlined-required"
            label="Email"
            placeholder="email"
            sx={{ ml: 10, mt: 5, width: "80%" }}
          />

          <Box sx={{ mb: 20 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ mt: 10, ml: 10 }}>
                <Typography>From:</Typography>

                <DateIn />
              </Box>

              <Box sx={{ mt: 10, ml: 15 }}>
                <Typography>To:</Typography>
                <DateOut />
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="medium"
            sx={{ mt: 2, ml: 2, mr: 2 }}
            component={Link}
            to="/orderconfirmation"
            color="inherit"
          >
            Submit Request
          </Button>
          {/* </Box> */}

          <Button
            component={Link}
            to="/listings"
            color="inherit"
            sx={{ mt: 10 }}
          >
            Back to Listings
          </Button>

          {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "40%",
                width: "60%",
                backgroundColor:"red",

                ml: "5%",
              }}
            ></Box> */}
        </Grid>
      </Grid>
      <Grid
        sx={{
          bgcolor: "#73777B",
          display: "flex",
          flexDirection: " column",
          //alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          alignContent: "center",
          // height: 800,
          pb: 10,
        }}
      >
        <Typography
          sx={{
            fontSize: 25,
            mt: 3,
            ml: 3,
            color: "white",
            align: "center",
          }}
        >
          Reviews
        </Typography>
        <Box
          sx={{
            height: 200,
            width: 800,
            mt: 3,
            ml: 3,
            bgcolor: "white",
          }}
        >
          <Rating
            name="user-rating"
            sx={{ mt: 2, ml: 2 }}
            value={value}
            readOnly
          />
          <Grid sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              // sx={{ width: 200, height: 200 }}
            />
            <Typography sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}>
              Vernon Owenga
            </Typography>
          </Grid>
          <Typography sx={{ mt: 2, ml: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa itaque
            in officiis? Neque, ducimus error! Atque molestias aliquid facere
            animi modi praesentium, illo enim reprehenderit omnis corrupti
            beatae sint voluptate?
          </Typography>
          <Divider />
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
            <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
              Helpful
            </Typography>
          </Grid>
        </Box>
        <Box
          sx={{
            height: 200,
            width: 800,
            mt: 3,
            ml: 3,
            bgcolor: "white",
          }}
        >
          <Rating
            name="user-rating"
            sx={{ mt: 2, ml: 2 }}
            value={value}
            readOnly
          />
          <Grid sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              // sx={{ width: 200, height: 200 }}
            />
            <Typography sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}>
              Vernon Owenga
            </Typography>
          </Grid>
          <Typography sx={{ mt: 2, ml: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa itaque
            in officiis? Neque, ducimus error! Atque molestias aliquid facere
            animi modi praesentium, illo enim reprehenderit omnis corrupti
            beatae sint voluptate?
          </Typography>
          <Divider />
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
            <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
              Helpful
            </Typography>
          </Grid>
        </Box>
        <Box
          sx={{
            height: 200,
            width: 800,
            mt: 3,
            ml: 3,
            bgcolor: "white",
          }}
        >
          <Rating
            name="user-rating"
            sx={{ mt: 2, ml: 2 }}
            value={value}
            readOnly
          />
          <Grid sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              // sx={{ width: 200, height: 200 }}
            />
            <Typography sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}>
              Vernon Owenga
            </Typography>
          </Grid>
          <Typography sx={{ mt: 2, ml: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa itaque
            in officiis? Neque, ducimus error! Atque molestias aliquid facere
            animi modi praesentium, illo enim reprehenderit omnis corrupti
            beatae sint voluptate?
          </Typography>
          <Divider />
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
            <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
              Helpful
            </Typography>
          </Grid>
        </Box>
        <Box
          sx={{
            height: 200,
            width: 800,
            mt: 3,
            ml: 3,
            bgcolor: "white",
          }}
        >
          <Rating
            name="user-rating"
            sx={{ mt: 2, ml: 2 }}
            value={value}
            readOnly
          />
          <Grid sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              // sx={{ width: 200, height: 200 }}
            />
            <Typography sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}>
              Vernon Owenga
            </Typography>
          </Grid>
          <Typography sx={{ mt: 2, ml: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa itaque
            in officiis? Neque, ducimus error! Atque molestias aliquid facere
            animi modi praesentium, illo enim reprehenderit omnis corrupti
            beatae sint voluptate?
          </Typography>
          <Divider />
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
            <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
              Helpful
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
