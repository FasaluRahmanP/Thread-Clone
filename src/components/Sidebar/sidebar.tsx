import React from 'react';
import logo from "../../../public/assets/threads-logo-white.svg";
import Image from 'next/image';
import StyledButton from '../../app/Ui/StyledSide'

const Sidebar = () => {
  return (
    <nav className='bg-[0a0a0a] h-full w-20'>
      <div className='flex flex-col items-center h-full py-4'>
        <div className='flex mb-10'>
          <Image 
            src={logo} 
            alt='logo' 
            className='h-8 w-8 cursor-pointer hover:scale-125 transition-transform duration-300' 
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <StyledButton ariaLabel="Home">
            <svg aria-label="Home" width="24" height="24" viewBox="0 0 26 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <title>Home</title>
              <path d="M23.7633 19.3452V11.3539C23.7633 10.1542 23.2841 9.00292 22.4128 8.17828C21.3913 7.21162 19.9742 5.90754 18.8301 4.9942C16.666 3.26652 15.5859 1.85492 13.0001 1.85492C10.4142 1.85492 9.33409 3.26652 7.16997 4.9942C6.0259 5.90754 4.60877 7.21162 3.58735 8.17828C2.716 9.00292 2.23682 10.1542 2.23682 11.3539V19.3452C2.23682 20.8313 3.44153 21.6378 4.92763 21.6378H8.76391C9.3162 21.6378 9.76391 21.19 9.76391 20.6378V16.3006V15.3398C9.76391 13.5289 11.2319 12.0609 13.0428 12.0609C14.8536 12.0609 16.3216 13.5289 16.3216 15.3398V16.3006V20.6378C16.3216 21.19 16.7693 21.6378 17.3216 21.6378H21.0725C22.5586 21.6378 23.7633 20.8313 23.7633 19.3452Z" stroke="grey" strokeWidth="2.5" />
            </svg>
          </StyledButton>
          <StyledButton ariaLabel="Search">
            <svg aria-label="Search" width="24" height="24" viewBox="0 0 24 25" fill="transparent" xmlns="http://www.w3.org/2000/svg">
              <title>Search</title>
              <path d="M16.5 17.725C18.0485 16.1084 19 13.9153 19 11.5C19 6.52944 14.9706 2.5 10 2.5C5.02944 2.5 1 6.52944 1 11.5C1 16.4706 5.02944 20.5 10 20.5C12.5552 20.5 14.8618 19.4351 16.5 17.725ZM16.5 17.725L22 23.225" stroke="grey" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </StyledButton>
          <StyledButton ariaLabel="Create">
            <svg aria-label="Create" width="24" height="24" viewBox="0 0 23 24" fill="transparent" xmlns="http://www.w3.org/2000/svg">
              <title>Create</title>
              <path d="M11.5 2.25H7.75C4.43629 2.25 1.75 4.93629 1.75 8.25V15.75C1.75 19.0637 4.43629 21.75 7.75 21.75H15.25C18.5637 21.75 21.25 19.0637 21.25 15.75V12M11.981 11.4534L20.396 3.03838" stroke="grey" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </StyledButton>
          <StyledButton ariaLabel="Notifications">
            <svg aria-label="Notifications" fill="transparent" height="26" role="img" viewBox="0 0 26 26" width="26">
              <title>Notifications</title>
              <path d="M2.5 9.85683C2.5 14.224 6.22178 18.5299 12.0332 22.2032C12.3554 22.397 12.7401 22.5909 13 22.5909C13.2703 22.5909 13.655 22.397 13.9668 22.2032C19.7782 18.5299 23.5 14.224 23.5 9.85683C23.5 6.11212 20.8698 3.5 17.4599 3.5C15.4847 3.5 13.9356 4.39792 13 5.74479C12.0851 4.40812 10.5257 3.5 8.5401 3.5C5.14059 3.5 2.5 6.11212 2.5 9.85683Z" stroke="grey" strokeWidth="2.5"></path>
            </svg>
          </StyledButton>
          <StyledButton ariaLabel="Profile">
            <svg aria-label="Profile" fill="transparent" height="26" role="img" viewBox="0 0 26 26" width="26">
              <title>Profile</title>
              <circle cx="13" cy="7.25" r="4" stroke="grey" strokeWidth="2.5" />
              <path d="M6.26678 23.75H19.744C21.603 23.75 22.5 23.2186 22.5 22.0673C22.5 19.3712 18.8038 15.75 13 15.75C7.19625 15.75 3.5 19.3712 3.5 22.0673C3.5 23.2186 4.39704 23.75 6.26678 23.75Z" stroke="grey" strokeWidth="2.5"></path>
            </svg>
          </StyledButton>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
