import React from 'react'
import MainBg from "../../../public/assets/MainBg-Photoroom.png";
import Image from 'next/image';

const Login = () => {
  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
<div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
  <Image
    src={MainBg}
    alt='MainBg'
    layout='fill'
    objectFit='cover'
    className='scale-100' // Adjust this value to zoom in more or less
  />
</div>
      <div className='relative z-10 max-w-md w-full space-y-8 p-8 rounded-xl'>
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
          <hr /> <span className='text-white text-center '> or</span>
          <hr />
        </form>
      </div>
    </div>
  )
}

export default Login
