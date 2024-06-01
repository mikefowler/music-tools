import React from 'react';
import Metronome from '../components/Metronome';

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <>
      <Metronome />
    </>
  );
};

export default HomePage;
