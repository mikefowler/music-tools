import React from 'react';
import { Link } from 'react-router-dom';

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <ul>
      <li>
        <Link to="/fretboard">Fretboard</Link>
      </li>
      <li>
        <Link to="/chords">Chords</Link>
      </li>
    </ul>
  );
};

export default HomePage;
