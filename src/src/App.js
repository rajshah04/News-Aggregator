import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Popular from './components/Popular';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import Footer from './components/Footer';
import Home from './components/Home';
import Search from './components/Search';
import Favourite from './components/Favourite';
import Support from './components/Support';

const Settings = () => <div>Settings Page</div>;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/support" element={<Support />} /> {/* Add the Support route */}
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
