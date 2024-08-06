import React from 'react'
import './Auth.css' ;    
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const SignUpForm = ({setIsActive}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate() ;

    const [showPassword, setShowPassword] = useState(false) ;
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) ;

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}` + "/signup", { firstName, lastName, email, password, confirmPassword });
            toast.success("Successfully Signed Up");
            setFirstName("") ;
            setLastName("") ;
            setEmail("") ;
            setPassword("") ;
            setConfirmPassword("") ;
            setIsActive(false) ;
            navigate("/") ;
        } catch (error) {
            console.error('There was an error registering!', error);
            // toast.error("There was an error registering");
            toast.error(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <h1 className='font-bold text-3xl'>Create Account</h1>
            <span>or use your email for registration</span>
            <div className='fild'>
                <input type="text" className='firstname' placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" className='lastname' placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type={showPassword ? "text" : "password"} className='relative' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {showPassword ? (
                <AiOutlineEyeInvisible className='cursor-pointer absolute translate-x-[125px] translate-y-[30px]'
                onClick={() => {
                    setShowPassword(false);
                    console.log(showPassword);
                }}
                fontSize={24}
                fill="#AFB2BF"
                />
            ) : (
                <AiOutlineEye className='cursor-pointer absolute translate-x-[125px] translate-y-[30px]'
                onClick={() => {
                    setShowPassword(true);
                    console.log(showPassword);
                }}
                fontSize={24}
                fill="#AFB2BF"
                />
            )}

            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {showConfirmPassword ? (
                    <AiOutlineEyeInvisible className='cursor-pointer absolute translate-x-[125px] translate-y-[85px]'
                    onClick={() => {
                        setShowConfirmPassword(false);
                        console.log(showConfirmPassword);
                    }}
                    fontSize={24}
                    fill="#AFB2BF"
                    />
                ) : (
                    <AiOutlineEye className='cursor-pointer absolute translate-x-[125px] translate-y-[85px]'
                    onClick={() => {
                        setShowConfirmPassword(true);
                        console.log(showConfirmPassword);
                    }}
                    fontSize={24}
                    fill="#AFB2BF"
                    />
                )}
                
            <button type="submit" >Sign Up</button>
        </form>
    );
}

export default SignUpForm ;