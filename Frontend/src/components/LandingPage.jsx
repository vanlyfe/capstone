import React from 'react';

import ProductHero from './LandingPage/ProductHero';
import ProductValues from './LandingPage/ProductInfo';
import ProductCategories from './LandingPage/ProductCategories';
import ProductHowItWorks from './LandingPage/ProductPopListings';
import ProductCTA from './LandingPage/ProductCTA';
import ProductSmokingHero from './LandingPage/ProductSmokingHero';
import Testimonials from './LandingPage/Testimonials';
import withRoot from '../withRoot';

function LandingPage() {
  return (
    <React.Fragment>
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <Testimonials />
      <ProductCTA />
      <ProductSmokingHero />
      
    </React.Fragment>
  );
}

export default withRoot(LandingPage);
