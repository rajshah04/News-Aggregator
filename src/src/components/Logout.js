// Logout.js
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token") ;
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;


// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SignInForm from './SignInForm';
// import Auth from './Auth' ;
// import { useContext } from 'react';
// import { AuthProvider, AuthContext } from '../AuthContext';

// const Logout = () => {
//     const navigate = useNavigate();
//     const { logout } = useContext(AuthContext);

//     useEffect(() => {
//         console.log('Logging out...');
//         logout() ;
        
//         console.log('Token removed from local storage');
//         navigate('/signin');
//     }, []);

//     return (
//         <div>
//             <Auth />
//         </div>
//     );
// }

// export default Logout;
