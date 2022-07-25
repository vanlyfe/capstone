import React from 'react';

import AppAppBar from './LandingPage/AppAppBar';
import ProductHero from './LandingPage/ProductHero';
import ProductValues from './LandingPage/ProductValues';
import ProductCategories from './LandingPage/ProductCategories';
import ProductHowItWorks from './LandingPage/ProductHowItWorks';
import ProductCTA from './LandingPage/ProductCTA';
import ProductSmokingHero from './LandingPage/ProductSmokingHero';
import AppFooter from './LandingPage/AppFooter';
import withRoot from '../withRoot';

function LandingPage() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(LandingPage);
