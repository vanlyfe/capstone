import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

let count;
let slideInterval;
const ProductHeroLayoutRoot = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    height: "80vh",
    minHeight: 500,
    maxHeight: 1300,
  },
}));

const Background = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});

function ProductHeroLayout(props) {
  const { sxBackground, children } = props;
  const slider = [
    "https://th.bing.com/th/id/OIP.2p9_qlScAc0kIuCcGdvDBwHaEU?w=327&h=190&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://c.pxhere.com/photos/73/d5/classic_female_model_person_vehicle_volkswagen_woman-986101.jpg!d",
    "https://images.squarespace-cdn.com/content/v1/594f385cbe6594fef26806a2/b10a67ab-1469-4bf6-b03c-4c3af41064c4/Tesla+camping?format=2500w",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnNextClick = () => {
    const imageLenght = slider.length;
    // count = (currentIndex + imageLenght + 1) % imageLenght;

    count = (currentIndex + 1) % imageLenght;
    setCurrentIndex(count);
  };
  // const slideRef = useRef();

  useEffect(() => {
    window.addEventListener("mouseEnter", pauseSlider);
    window.addEventListener("mouseLeave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
  });

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnPreviousClick();
    }, 3000);
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
    <ProductHeroLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "common.black",
            opacity: 0.5,
            zIndex: -1,
          }}
        />

        {/* <SliderData
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            zIndex: -2,
          }}
        /> */}
        <Background>
          <Box sx={{ position: "relative" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={slider[currentIndex]}
              alt=""
            />
            <Box
              sx={{
                padding: 3,
                display: "flex",
                justifyContent: "space-between",
                transform: "50%",
              }}
            >
              <Button onClick={handleOnPreviousClick}></Button>
              <Button onClick={handleOnNextClick}></Button>
            </Box>
          </Box>{" "}
        </Background>

        <ArrowDownwardIcon
          height="16"
          width="12"
          sx={{ position: "absolute", bottom: 32 }}
        />
      </Container>
    </ProductHeroLayoutRoot>
  );
}

ProductHeroLayout.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ProductHeroLayout;
