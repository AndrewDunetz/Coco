import React from 'react';

import './homepage.styles.scss';

import { HomePageContainer } from './homepage.styles';
import { Button } from '@mui/material';

const HomePage = () => (
  <HomePageContainer>
    <section class="hero-image">
      <h1 class="welcome-text">
        <div>Welcome to ASLingo!</div>
      </h1>
      <Button className="cta-button button" variant='contained'>Start Learning!</Button>
    </section>
  </HomePageContainer>
);

export default HomePage;
