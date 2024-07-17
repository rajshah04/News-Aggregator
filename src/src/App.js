// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Categories from './components/Categories';
// import Popular from './components/Popular';
// import Dashboard from './components/Dashboard';
// import Explore from './components/Explore';
// import Footer from './components/Footer';
// import Home from './components/Home';
// import Search from './components/Search';
// import Favourite from './components/Favourite';
// import Support from './components/support';
// import Settings from './components/Settings';
// import { AuthProvider, AuthContext } from './AuthContext';
// import { useContext } from 'react';
// import Auth from './components/Auth';
// import SignUpForm from './components/SignUpForm';
// import SignInForm from './components/SignInForm';


// function App() {

//   const { isAuthenticated } = useContext(AuthContext);

//   return (
//     <div className="App">
//       {isAuthenticated ? (
//         <Router>
//         <div className="App">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/categories" element={<Categories />} />
//             <Route path="/popular" element={<Popular />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/explore" element={<Explore />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/favourite" element={<Favourite />} />
//             <Route path="/support" element={<Support />} /> 
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/signup" element={<SignUpForm />} />
//             <Route path="/signin" element={SignInForm} />
//           </Routes>
//           <Footer />
//         </div>
//       </Router>
//       ) : (
//         <div>
//           <Auth />
//           {/* Hello */}
//         </div>
//       )}
//     </div>
//     // <Router>
//     //   <div className="App">
//     //     <Navbar />
//     //     <Routes>
//     //       <Route path="/" element={<Home />} />
//     //       <Route path="/categories" element={<Categories />} />
//     //       <Route path="/popular" element={<Popular />} />
//     //       <Route path="/dashboard" element={<Dashboard />} />
//     //       <Route path="/explore" element={<Explore />} />
//     //       <Route path="/search" element={<Search />} />
//     //       <Route path="/favourite" element={<Favourite />} />
//     //       <Route path="/support" element={<Support />} /> 
//     //       <Route path="/settings" element={<Settings />} />
//     //     </Routes>
//     //     <Footer />
//     //   </div>
//     // </Router>
//   );
// }

// export default App;



import React, { useContext } from 'react';
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
import Settings from './components/Settings';
import { AuthProvider, AuthContext } from './AuthContext';
import Auth from './components/Auth';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {isAuthenticated ? (
            <>
              {/* <Navbar /> */}
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
                {/* <Route path="/signin" element={<SignInForm />} /> */}
              </Routes>
              {/* <Footer /> */}
            </>
          ) : (
            <>
           
            <Auth />
            </>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
