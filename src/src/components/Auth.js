import React, { useState } from 'react';
import './Auth.css';
import SignUpForm from './SignUpForm' ;
import SignInForm from './SignInForm' ;

const Auth = () => {
    const [isActive, setIsActive] = useState(false);

    function handleSignIn() {
        setIsActive(false) ;
    }

    return (
        <div className='wrapper'>
            <div className={`container2 ${isActive ? 'active' : ''} `} id="container2">
            <div className="form-container2 sign-up text-white">
                <SignUpForm setIsActive={setIsActive} />
            </div>
            <div className="form-container2 sign-in text-white">
                <SignInForm />
            </div>
            <div className="toggle-container2">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1 className='font-bold text-3xl'>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className="" id="login" onClick={handleSignIn}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1 className='font-bold text-3xl'>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className="" id="register" onClick={() => setIsActive(true)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Auth;