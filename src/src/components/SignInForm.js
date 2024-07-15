import React from 'react' ;
// import './Auth.css' ;
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false) ;

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/v1/login', { email, password });
            toast.success("Successfully logged in");
            // window.location.href = "https://harshsojitra.me";
        } catch (error) {
            console.error('There was an error logging in!', error);
            toast.error("There was an error logging in");
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    return (
        <form onSubmit={handleSignIn} className=''>
            <h1 className='font-bold text-3xl'>Sign In</h1>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {/* <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
            
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {showPassword ? (
                    <AiOutlineEyeInvisible
                    onClick={() => {
                        setShowPassword(false);
                        console.log(showPassword);
                    }}
                    fontSize={24}
                    fill="#AFB2BF"
                    />
                ) : (
                    <AiOutlineEye
                    onClick={() => {
                        setShowPassword(true);
                        console.log(showPassword);
                    }}
                    fontSize={24}
                    fill="#AFB2BF"
                    />
                )}
            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignInForm ;