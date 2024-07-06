import React from 'react';
import Main from './Main';
import Categories from './Categories';
import Popular from './Popular';
import Dashboard from './Dashboard';
import Explore from './Explore';

const Home = () => {
  return (
    <div>
      <Main />
      <Categories />
      <Popular />
      <Dashboard />
      <Explore />
    </div>
  );
}

export default Home;
