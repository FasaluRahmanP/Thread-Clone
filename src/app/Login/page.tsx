import React from 'react';
import MainBg from "../../../public/assets/MainBg-Photoroom.png";
import Image from 'next/image';
import Scan from '../../../public/assets/Scanner.png';

const Login = () => {
  return (
    <>
      <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
          <Image
            src={MainBg}
            alt='MainBg'
            // layout='fill'
            // objectFit='cover'
            className='scale-x-125 scale-y-150'
          />
        </div>
        <div className='relative z-10 max-w-md w-full space-y-8 p-8 rounded-xl mt-28'>
          <div>
            <h2 className='text-center text-base font-bold text-white'>Log in with your Instagram account</h2>
          </div>
          <form>
            <div>
              <input
                type='email'
                autoComplete='none'
                required
                className='bg-[#201d1d] appearance-none rounded-xl block w-full px-3 p-4 placeholder-gray-500 text-white'
                placeholder='Username, phone or email'
              />
              <input
                type='password'
                autoComplete='none'
                required
                className='bg-[#201d1d] appearance-none rounded-xl block w-full px-3 p-4 mt-3 placeholder-gray-500 text-white'
                placeholder='Password'
              />
              <button
                type='submit'
                className='bg-white text-black rounded-xl block w-full px-3 p-4 mt-4'
              >
                Log in
              </button>
            </div>
            <p className='text-gray-400 text-center mt-5 cursor-pointer'>
              Forgot password?
            </p>
            <div className='flex items-center my-5'>
              <hr className='flex-grow border-gray-400' />
              <span className='text-white mx-4'>or</span>
              <hr className='flex-grow border-gray-400' />
            </div>
            <div>
              <button
                type='button'
                className='bg-[#201d1d] text-white rounded-xl block w-full px-3 p-4 mt-4 border-l-neutral-700 text-lg'
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className='absolute bottom-0 right-10'>
          <Image
            src={Scan}
            alt='Scan'
            width={225}
            height={225}
            className='mx-auto hover:scale-110 transition-transform duration-300'
          />
        </div>
      </div>
    </>
  );
}

export default Login;
