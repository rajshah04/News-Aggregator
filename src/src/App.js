import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Categories from './components/Categories';
import Popular from './components/Popular';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import Home from './components/Home';
import Search from './components/Search';
import Favourite from './components/Favourite';
import Support from './components/Supp';
import Settings from './components/Settings';
import { AuthProvider, AuthContext } from './AuthContext';
import Auth from './components/Auth';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <ThemeProvider>
    <AuthProvider>
      <Router>
        <div className="App">
          {isAuthenticated ? (
            <>
              <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/home" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/support" element={<Support />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </>
          ) : (
            <>
              <Auth />
            </>
          )}
        </div>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
