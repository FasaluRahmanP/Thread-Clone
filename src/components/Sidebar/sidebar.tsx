"use client"
import React, { useState } from 'react';
import logo from "../../../public/assets/threads-logo-white.svg";
import Image from 'next/image';
import StyledButton from '../../app/Ui/StyledSide'
import { CgDetailsMore } from "react-icons/cg";
import Link from 'next/link';

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };
  return (
    <nav className='bg-[0a0a0a] h-full w-20 fixed z-50'>
      <div className='flex flex-col items-center h-full py-4 '>
        <div className='flex mb-10'>
          <Image
            src={logo}
            alt='logo'
            className='h-8 w-8 cursor-pointer hover:scale-125 transition-transform duration-300'
          />
        </div>
        <div className='flex flex-col space-y-0'>
          <Link href={"/main"}>
            <StyledButton ariaLabel="Home">
              <svg aria-label="Home" width="24" height="24" viewBox="0 0 26 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <title>Home</title>
                <path d="M23.7633 19.3452V11.3539C23.7633 10.1542 23.2841 9.00292 22.4128 8.17828C21.3913 7.21162 19.9742 5.90754 18.8301 4.9942C16.666 3.26652 15.5859 1.85492 13.0001 1.85492C10.4142 1.85492 9.33409 3.26652 7.16997 4.9942C6.0259 5.90754 4.60877 7.21162 3.58735 8.17828C2.716 9.00292 2.23682 10.1542 2.23682 11.3539V19.3452C2.23682 20.8313 3.44153 21.6378 4.92763 21.6378H8.76391C9.3162 21.6378 9.76391 21.19 9.76391 20.6378V16.3006V15.3398C9.76391 13.5289 11.2319 12.0609 13.0428 12.0609C14.8536 12.0609 16.3216 13.5289 16.3216 15.3398V16.3006V20.6378C16.3216 21.19 16.7693 21.6378 17.3216 21.6378H21.0725C22.5586 21.6378 23.7633 20.8313 23.7633 19.3452Z" stroke="grey" strokeWidth="2.5" />
              </svg>
            </StyledButton>
          </Link>

          <Link href={"/main/Search"}>
            <StyledButton ariaLabel="Search">
              <svg aria-label="Search" width="24" height="24" viewBox="0 0 24 25" fill="transparent" xmlns="http://www.w3.org/2000/svg">
                <title>Search</title>
                <path d="M16.5 17.725C18.0485 16.1084 19 13.9153 19 11.5C19 6.52944 14.9706 2.5 10 2.5C5.02944 2.5 1 6.52944 1 11.5C1 16.4706 5.02944 20.5 10 20.5C12.5552 20.5 14.8618 19.4351 16.5 17.725ZM16.5 17.725L22 23.225" stroke="grey" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </StyledButton>
          </Link>

          <Link href={"/main/AddPost"}>
          <StyledButton ariaLabel="Create">
            <svg aria-label="Create" width="24" height="24" viewBox="0 0 23 24" fill="transparent" xmlns="http://www.w3.org/2000/svg">
              <title>Create</title>
              <path d="M11.5 2.25H7.75C4.43629 2.25 1.75 4.93629 1.75 8.25V15.75C1.75 19.0637 4.43629 21.75 7.75 21.75H15.25C18.5637 21.75 21.25 19.0637 21.25 15.75V12M11.981 11.4534L20.396 3.03838" stroke="grey" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </StyledButton>
          </Link>

          <Link href={"/main/Activity"}>
            <StyledButton ariaLabel="Notifications">
              <svg aria-label="Notifications" fill="transparent" height="26" role="img" viewBox="0 0 26 26" width="26">
                <title>Notifications</title>
                <path d="M2.5 9.85683C2.5 14.224 6.22178 18.5299 12.0332 22.2032C12.3554 22.397 12.7401 22.5909 13 22.5909C13.2703 22.5909 13.655 22.397 13.9668 22.2032C19.7782 18.5299 23.5 14.224 23.5 9.85683C23.5 6.11212 20.8698 3.5 17.4599 3.5C15.4847 3.5 13.9356 4.39792 13 5.74479C12.0851 4.40812 10.5257 3.5 8.5401 3.5C5.14059 3.5 2.5 6.11212 2.5 9.85683Z" stroke="grey" strokeWidth="2.5"></path>
              </svg>
            </StyledButton>
          </Link>

          <Link href={"/main/Profile"}>
            <StyledButton ariaLabel="Profile">
              <svg aria-label="Profile" fill="transparent" height="26" role="img" viewBox="0 0 26 26" width="26">
                <title>Profile</title>
                <circle cx="13" cy="7.25" r="4" stroke="grey" strokeWidth="2.5" />
                <path d="M6.26678 23.75H19.744C21.603 23.75 22.5 23.2186 22.5 22.0673C22.5 19.3712 18.8038 15.75 13 15.75C7.19625 15.75 3.5 19.3712 3.5 22.0673C3.5 23.2186 4.39704 23.75 6.26678 23.75Z" stroke="grey" strokeWidth="2.5"></path>
              </svg>
            </StyledButton>
          </Link>
        </div>

        {/* <div className='flex flex-col items-center h-full py-4'> */}
        <StyledButton ariaLabel="Pin" className='mt-10'>
          <svg aria-label="Pin" fill="transparent" height="26" role="img" viewBox="0 0 26 26" width="26">
            <title>Pin</title>
            <path d="M12 23.922c-.072 0-.166-.085-.283-.254a3.489 3.489 0 0 1-.352-.654 5.193 5.193 0 0 1-.293-.899 4.25 4.25 0 0 1-.117-.976v-5.576h2.08v5.576c0 .319-.039.644-.117.976a5.202 5.202 0 0 1-.293.899 3.489 3.489 0 0 1-.352.654c-.11.17-.201.254-.273.254ZM5.78 16.49c-.482 0-.87-.14-1.163-.42-.286-.286-.43-.66-.43-1.123 0-.748.2-1.478.596-2.187.397-.71.947-1.345 1.65-1.905a8.372 8.372 0 0 1 2.481-1.328c.95-.332 1.98-.498 3.086-.498 1.107 0 2.132.166 3.076.498a8.372 8.372 0 0 1 2.48 1.329c.71.56 1.26 1.194 1.651 1.904.397.71.596 1.439.596 2.187 0 .463-.143.837-.43 1.123-.286.28-.67.42-1.152.42H5.779Zm.488-1.787h11.455c.182 0 .257-.104.224-.312-.058-.43-.244-.86-.556-1.29-.313-.43-.73-.82-1.25-1.171a6.823 6.823 0 0 0-1.836-.85A7.792 7.792 0 0 0 12 10.758a7.89 7.89 0 0 0-2.314.322 6.85 6.85 0 0 0-1.827.85c-.52.351-.937.742-1.25 1.172-.312.43-.5.859-.566 1.289-.033.208.042.312.225.312Zm-.84-13.086c0-.338.117-.618.351-.84.241-.228.554-.341.938-.341h10.566c.384 0 .694.113.928.341.24.222.361.502.361.84 0 .352-.136.7-.41 1.045a5.307 5.307 0 0 1-.693.723c-.293.26-.632.534-1.016.82-.384.287-.784.573-1.201.86l.361 5.41h-1.875l-.361-6.24c-.013-.17.042-.284.166-.342.3-.163.583-.326.85-.489.273-.162.514-.315.722-.459.209-.143.381-.27.518-.38.137-.118.23-.202.283-.254.046-.053.055-.098.03-.137-.02-.04-.056-.059-.108-.059H8.152a.123.123 0 0 0-.107.059c-.02.039-.01.084.03.137.051.052.146.136.282.253.144.111.32.238.528.381.215.144.452.297.713.46.267.162.553.325.859.488.124.058.182.172.176.341l-.371 6.24H8.377l.371-5.41a32.5 32.5 0 0 1-1.21-.859 19.68 19.68 0 0 1-1.017-.82 5.57 5.57 0 0 1-.683-.723c-.274-.345-.41-.693-.41-1.045Z" stroke="grey" strokeWidth="2"></path>
          </svg>
        </StyledButton>

        <StyledButton ariaLabel="more">
          <CgDetailsMore style={{ color: "grey", fontSize: "25px" }} onClick={toggleDropdown} />
        </StyledButton>

        {dropdownOpen && (
          <div className="fixed bottom-16 left-20 bg-[#212121] text-[#F3F5F7] px-4 py-2 rounded-2xl w-2/12">
            <button className="cursor-pointer py-3 w-full text-left rounded-2xl">Appearance</button>
            <button className="cursor-pointer py-3 w-full text-left rounded-2xl">Insight</button>
            <button className="cursor-pointer py-3 w-full text-left rounded-2xl">Settings</button>
            <button className="cursor-pointer py-3 w-full text-left rounded-2xl">Report a problem</button>
            <button className="cursor-pointer py-3 w-full text-left rounded-2xl">Log out</button>
          </div>
        )}


        {/* </div> */}
      </div>

    </nav>
  );
};

export default Sidebar;
