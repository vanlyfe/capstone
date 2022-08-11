import React from "react";
import { Box } from "@mui/material";
import ProductHero from "./LandingPage/ProductHero";
import ProductValues from "./LandingPage/ProductInfo";
import ProductCategories from "./LandingPage/ProductCategories";
import ProductHowItWorks from "./LandingPage/ProductPopListings";
import ProductCTA from "./LandingPage/ProductCTA";
import ProductSmokingHero from "./LandingPage/ProductSmokingHero";
import Testimonials from "./LandingPage/Testimonials";
import withRoot from "../withRoot";
import Footer from "./Footer";
import Steps from "./LandingPage/Steps";
import FAQ from "./LandingPage/FAQ";

function LandingPage() {
  return (
    <React.Fragment>
      <ProductHero />
      <Box id="about">
        <ProductValues />
      </Box>
      <Box id="howItWorks">
        <Steps />
      </Box>

      <ProductHowItWorks />
      <ProductCategories />

      <Testimonials />
      <Box id="faq">
        <FAQ />
      </Box>
      <ProductCTA />
      <ProductSmokingHero />
      <Footer />
    </React.Fragment>
  );
}

export default withRoot(LandingPage);
