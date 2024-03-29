import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import variables from "../assets/variables.js";
import {
  Autocomplete,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Rating,
  Slide,
  TextField,
} from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

import apiClient from "../services/apiClient";

export default function Listings(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [listings, setListings] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [rating, setRating] = React.useState(0);
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [favorites, setFavorites] = React.useState([]);

  const [form, setForm] = React.useState({
    minRating: "",
    location: "",
    model: "",
    year: "",
    minPrice: "",
    maxPrice: "",
  });

  const navigate = useNavigate();
  const locations = variables.locations;
  const models = variables.makes;

  const handleOnInputChange = (event) => {
    if (event.target.name === "minPrice") {
      if (form.maxPrice !== "") {
        if (Number(event.target.value) > Number(form.maxPrice)) {
          setErrors((e) => ({
            ...e,
            price: "Max price cannot be less than min price",
          }));
        } else {
          setErrors((e) => ({ ...e, price: null }));
        }
      } else {
        setErrors((e) => ({ ...e, price: null }));
      }
    }

    if (event.target.name === "maxPrice") {
      if (form.minPrice !== "") {
        if (Number(event.target.value) < Number(form.minPrice)) {
          setErrors((e) => ({
            ...e,
            price: "Max price cannot be less than min price",
          }));
        } else {
          setErrors((e) => ({ ...e, price: null }));
        }
      } else {
        setErrors((e) => ({ ...e, price: null }));
      }
      if (event.target.value === "") {
        setErrors((e) => ({ ...e, price: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    const getListings = async () => {
      const response = await apiClient.fetchListings();

      if (response?.data?.listings) {
        setListings(response.data.listings);
      } else {
        setError("No listings found");
      }
    };

    const getFavorites = async () => {
      if (props.user) {
        const { data, error } = await apiClient.getFavoritesIds(props.user.id);
        if (data?.favorites) {
          setFavorites(data.favorites);
        }
      }
    };

    getFavorites();
    getListings();
    setTimeout(function () {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleOnReset = async (e) => {
    const getListings = async () => {
      const response = await apiClient.fetchListings();
      if (response?.data?.listings) {
        setListings(response.data.listings);
      } else {
        setError("No listings found");
      }
    };

    getListings();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setErrors((e) => ({ ...e, form: null }));
    setRating(0);

    const { data, error } = await apiClient.filterListings(form);

    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }

    if (data?.listings) {
      setListings(data.listings);
    }
  };

  const filterItems = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Typography variant="p" align="center">
        {`Minimum Rating`}
      </Typography>
      <Rating
        name="minRating"
        precision={0.5}
        onChange={(event, newValue) => {
          setRating(newValue);
          setForm((f) => ({
            ...f,
            [event.target.name]: event.target.value,
          }));
        }}
      />
      <Autocomplete
        disablePortal
        id="locations-auto-complete"
        options={locations}
        sx={{ width: "90%", mt: 2 }}
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

      <Autocomplete
        disablePortal
        id="model-auto-complete"
        options={models}
        sx={{ width: "90%", mt: 2 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Model"
            name="model"
            onChange={handleOnInputChange}
            onSelect={handleOnInputChange}
          />
        )}
      />

      <TextField
        id="outlined-number"
        sx={{ width: "90%", mt: 2 }}
        name="year"
        onChange={handleOnInputChange}
        label="Year"
        type="number"
      />

      <Typography variant="p" align="center" mt={2}>
        {`Price Range`}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ mt: 2, width: "40%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Min</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            type="number"
            name="minPrice"
            onChange={handleOnInputChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <Typography variant="h5">-</Typography>
        <FormControl sx={{ mt: 2, width: "40%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Max</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            type="number"
            onChange={handleOnInputChange}
            name="maxPrice"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </Box>
      {errors.price && <span className="filterErrors">{errors.price}</span>}
      <Button
        className="filterButton"
        variant="contained"
        onClick={handleOnSubmit}
        sx={{ mt: 3, mb: 2 }}
        disabled={
          errors?.price ||
          (form.minRating === "" &&
            form.model === "" &&
            form.year === "" &&
            form.location === "" &&
            form.minPrice === "" &&
            form.maxPrice === "")
        }
      >
        SEARCH
      </Button>

      <Button
        className="filterButton"
        variant="contained"
        onClick={handleOnReset}
        sx={{ mt: 3, mb: 2 }}
      >
        RESET
      </Button>
      {/* <FormControl sx={{ ml: 3, my: 2 }}>
    <FormLabel id="demo-radio-buttons-group-label">
      Vehicle Type
    </FormLabel>
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group">
      <FormControlLabel
        value="female"
        control={<Radio />}
        label="Female"
      />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel
        value="other"
        control={<Radio />}
        label="Other"
      />
    </RadioGroup>
  </FormControl> */}
    </Box>
  );

  return (
    <Container maxWidth="100%" sx={{ mt: 0, my: 1 }}>
      <Box container spacing={2} display="flex">
        {/* Desktop Filter List */}
        <Paper
          elevation={3}
          xs={2}
          sx={{
            display: { xs: "none", md: "block" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 5,
            mr: 3,
            height: "80vh",
            width: 280,
          }}
        >
          <Typography variant="h5" align="center" sx={{ my: 2 }}>
            {`Filter`}
          </Typography>
          <Divider />
          {filterItems}
        </Paper>

        {/* Mobile Filter Bottom Bar */}

        <Paper
          elevation={3}
          sx={{
            zIndex: 1,
            display: { xs: "block", md: "none" },
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "7vh",
            width: "100%",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mr: 3,
            }}
          >
            <Button
              onClick={() => {
                setMobileMenuOpen(true);
              }}
            >
              <Typography variant="h6">{`Filter`}</Typography>
              <KeyboardDoubleArrowUpIcon />
            </Button>
          </Box>
        </Paper>

        {/* Mobile Filter Menu */}
        <Slide direction={"up"} in={mobileMenuOpen} mountOnEnter>
          <Paper
            sx={{
              zIndex: 1,
              height: "80vh",
              width: "100%",
              position: "fixed",
              bottom: 0,
              left: 0,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
              overflowY: "scroll",
            }}
            elevation={3}
          >
            <Button
              sx={{
                position: "absolute",
                top: 5,
              }}
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <Typography variant="h6">{`Filter`}</Typography>

              <KeyboardDoubleArrowDownIcon />
            </Button>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                bgColor: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 8,
              }}
            >
              {filterItems}
            </Box>
          </Paper>
        </Slide>

        <Grid
          container
          // bgcolor="red"
          sx={{ width: "100%", height: "100%" }}
          spacing={{ xs: 2, md: 3, lg: 5, xl: 7 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
              {`Browse Active Listings`}
            </Typography>
          </Grid>
          {listings.length > 0 || isLoading ? (
            listings.map((listing, i) => (
              <Grid key={i} item xs={4} justifyContent="center">
                <Card sx={{ width: "100%" }}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/listing/${listing.id}`}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={listing.image_url}
                      alt="listing photo"
                    />
                  </Link>

                  <CardContent>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="modeLimit"
                      >
                        {listing.make +
                          " " +
                          listing.model +
                          " " +
                          listing.year}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          {listing.max_accomodation}
                        </Typography>
                        <PersonIcon fontSize="small" />
                      </Box>
                    </Box>

                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {listing.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                      >
                        ${listing.price}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/listing/${listing.id}`}
                        >
                          <Button size="small">Learn More</Button>
                        </Link>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Rating
                          readOnly={true}
                          className="listRating"
                          value={listing.rating}
                          sx={{ mr: 3 }}
                        />
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          checked={favorites.includes(listing.id)}
                          onClick={async () => {
                            if (!props.user) {
                              navigate("/login");
                            } else {
                              if (!favorites.includes(listing.id)) {
                                await apiClient.postFavorite(listing.id);
                                const { data, error } =
                                  await apiClient.getFavoritesIds(
                                    props.user.id
                                  );
                                setFavorites(data.favorites);
                              } else {
                                await apiClient.deleteFavorite(listing.id);
                                const { data, error } =
                                  await apiClient.getFavoritesIds(
                                    props.user.id
                                  );
                                setFavorites(data.favorites);
                              }
                            }
                          }}
                          sx={{ color: "grey" }}
                        />
                      </Box>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <div className="noItems">No items meet your search criteria</div>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
