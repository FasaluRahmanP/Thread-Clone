'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, Rootstate } from '../Store/Store';
import { SetName, SetUserName, SetEmail, SetPhone, SetPassword, SetConfirmPassword } from "@/app/Store/Reducer/SignUpSlice";
import { SignupUser } from '@/app/Store/Reducer/SignUpSlice';

const Signup: React.FC = () =>{
    const dispatch = useDispatch<AppDispatch>();
    const { Name, UserName, Email, Phone, Password, ConfirmPassword, status, error } = useSelector((state: Rootstate) => state.signup);

    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Password === ConfirmPassword) {
            dispatch(SignupUser({ Name, UserName, Email, Phone, Password }));
        } else {
            console.log("Passwords do not match");
        }
    };

    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
            </div>
            <div className='relative z-10 max-w-md w-full space-y-6 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl mt-0'>
                <h2 className='text-center text-lg sm:text-xl font-bold text-white'>
                    Create your account
                </h2>
                <form onSubmit={HandleSubmit}>
                    <div>
                        <input
                            type='text'
                            autoComplete='none'
                            required
                            className='bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 placeholder-gray-500 text-white'
                            placeholder='Name:'
                            value={Name}
                            onChange={(e) => dispatch(SetName(e.target.value))}
                        />
                        <input
                            type='text'
                            autoComplete='none'
                            required
                            className='bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-3 placeholder-gray-500 text-white'
                            placeholder='Username:'
                            value={UserName}
                            onChange={(e) => dispatch(SetUserName(e.target.value))}
                        />
                        <input
                            type='email'
                            autoComplete='none'
                            required
                            className='bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-3 placeholder-gray-500 text-white'
                            placeholder='Email:'
                            value={Email}
                            onChange={(e) => dispatch(SetEmail(e.target.value))}
                        />
                        <input
                            type='text'
                            autoComplete='none'
                            required
                            className='bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-3 placeholder-gray-500 text-white'
                            placeholder='Phone No:'
                            value={Phone}
                            onChange={(e) => dispatch(SetPhone(e.target.value))}
                        />
                        <input
                            type='password'
                            autoComplete='none'
                            required
                            className='bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-3 placeholder-gray-500 text-white'
                            placeholder='Password:'
                            value={Password}
                            onChange={(e) => dispatch(SetPassword(e.target.value))}
                        />
                        <input
                            type='password'
                            autoComplete='none'
                            required
                            className='bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-3 placeholder-gray-500 text-white'
                            placeholder='Confirm Password:'
                            value={ConfirmPassword}
                            onChange={(e) => dispatch(SetConfirmPassword(e.target.value))}
                        />
                        <button
                            type='submit'
                            className='bg-white text-black rounded-xl block w-full px-3 py-3 mt-4 text-sm'
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
