"use client"
import MainBg from "../../../public/assets/MainBg-Photoroom.png";
import Image from 'next/image';
import Scan from '../../../public/assets/Scanner.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks/useAppDispatch";
import ReusableInput from "@/app/Ui/StyledLogin";
import { loginUser } from "../Store/Reducer/LoginSlice";
import { setCookies } from "@/Library/utilities/setCookies";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch()
  const router = useRouter();
  const { user, status, error } = useAppSelector((state) => state.Login);


  useEffect(() => {
    if (status === 'SUCCESSFULL' && user) {
        const userId = user._id;
        setCookies(userId);
        router.push('/main');
        console.log(userId)
    }
}, [status, user, router]);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
};

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
        <Image
          src={MainBg}
          alt='MainBg'
          className='scale-x-105 scale-y-90 object-cover'
        />
      </div>
      <div className='relative z-10 max-w-md w-full space-y-6 p-6 sm:p-8 md:p-10 lg:p-14 rounded-xl mt-24'>
        <p className='text-center text-sm sm:text-xl font-normal text-white'>
          Log in with your Instagram account
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <ReusableInput
              type='text'
              placeholder='Username, phone or email'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <ReusableInput
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='submit'
              className='bg-white text-black rounded-xl block w-full px-3 py-3 mt-3 text-sm'
            >
              Log in
            </button>
          </div>
          <p className='text-gray-400 text-center mt-4 cursor-pointer text-sm'>
            Forgot password?
          </p>
          <div className='flex items-center my-4'>
            <hr className='flex-grow border-gray-400' />
            <span className='text-white mx-2 text-sm'>or</span>
            <hr className='flex-grow border-gray-400' />
          </div>
          <div>
            <Link href={"/Signup"}>
              <button
                type='button'
                className='bg-[#101010] text-white rounded-xl block w-full px-7 py-3 mt-3 text-sm border border-gray-600'
              >
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>
      <div className='absolute bottom-0 right-8 md:right-10 lg:right-12'>
        <Image
          src={Scan}
          alt='Scan'
          width={180}
          height={180}
          className='mx-auto hover:scale-110 transition-transform duration-300'
        />
      </div>
    </div>
  );
}

export default Login;