import React from 'react';
import Main from './Main';
import Categories from './Categories';
import Popular from './Popular';
import Dashboard from './Dashboard';
import Explore from './Explore';
import Footer from './Footer';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Categories />
      <Popular />
      <Dashboard />
      <Explore />
      <Footer />
    </div>
  );
}

export default Home;
