import * as React from 'react';
import Button from './Button';
import Box from '@mui/material/Box';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import { Link } from 'react-router-dom';

const slider = [
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
  'https://c.pxhere.com/photos/73/d5/classic_female_model_person_vehicle_volkswagen_woman-986101.jpg!d',
  'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  'https://images.squarespace-cdn.com/content/v1/594f385cbe6594fef26806a2/b10a67ab-1469-4bf6-b03c-4c3af41064c4/Tesla+camping?format=2500w',
];

let count;
let slideInterval;
export default function ProductHero() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    window.addEventListener('mouseEnter', pauseSlider);
    window.addEventListener('mouseLeave', startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
  });

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnPreviousClick();
    }, 5000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnPreviousClick = () => {
    const imageLenght = slider.length;
    count = (currentIndex + imageLenght - 1) % imageLenght;
    setCurrentIndex(count);
  };
  return (
    <Box>
      <ProductHeroLayout
        sxBackground={{
          backgroundImage: `url(${slider[currentIndex]})`,
          backgroundColor: '#7fc7d9',
          backgroundPosition: 'center',
        }}>
        {/* Increase the network loading priority of the background image. */}
        {/* <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="increase priority"
        /> */}
        <Typography color="inherit" align="center" variant="h2" marked="center">
          Rent Your New Home-On-Wheels
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}>
          There are thousands of vehicles to choose from at affordable prices.
        </Typography>
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            to="/listings"
            color="secondary"
            variant="contained"
            size="large"
            component={Link}
            sx={{ margin: 1 }}>
            Browse Listings
          </Button>

          <Button
            color="secondary"
            variant="contained"
            size="large"
            component={Link}
            to="/createlisting"
            href="/premium-themes/onepirate/sign-up/"
            sx={{ margin: 1 }}>
            Create Listing
          </Button>
        </Box>

        <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
          Discover the experience
        </Typography>
      </ProductHeroLayout>
    </Box>
  );
}
