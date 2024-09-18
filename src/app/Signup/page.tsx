import React from 'react';

const Signup = () => {
    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
            </div>
            <div className='relative z-10 max-w-md w-full space-y-6 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl mt-0'>
                <h2 className='text-center text-lg sm:text-xl font-bold text-white'>
                    Create your account
                </h2>
                <form>
                    <div>
                        <input
                            type='email'
                            autoComplete='none'
                            required
                            className='bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 placeholder-gray-500 text-white'
                            placeholder='Username, phone or email'
                        />
                        <input
                            type='password'
                            autoComplete='none'
                            required
                            className='bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-3 placeholder-gray-500 text-white'
                            placeholder='Password'
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
