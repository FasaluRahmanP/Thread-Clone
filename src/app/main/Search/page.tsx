"use client";
import { useAppDispatch, useAppSelector } from '@/app/Hooks/useAppDispatch';
import { fetchuser } from '@/app/Store/Reducer/UserSlice';
import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";

const Page = () => {
  const { users } = useAppSelector((state) => state.users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchuser());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <nav><h1 className='main-heading'>Search</h1></nav>
      <div className="flex items-center justify-center h-auto">
        <div className="h-auto w-6/12 bg-[#201d1d] rounded-3xl ">
          <div className='search-bar'>
            <IoSearch style={{ color: "grey", fontSize: "20px" }} />
            <input
              type='text'
              placeholder='Search'
              className='search-input'
              onChange={handleSearchChange}
            />
          </div>
          <p className='search-suggestions'>Follow suggestions</p>
          <div className='search-result'>
            {filteredUsers.length > 0 ? (
              [...filteredUsers].map(user => (
                <div key={user.id} className="search-result-item">
                  <div className='search-post-user'>
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt='Profile'
                        className='search-profile-image'
                      />
                    ) : (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="profile"
                        className='search-profile-image'
                      />
                    )}
                    <div className='search-user-details'>
                      <div className='search-user-info'>
                        <p className='search-post-text'>{user.name}</p>
                        <p className='search-profile-name'>{user.username}</p>
                        <p className='search-followers'>{user.followers.length} followers</p>
                      </div>
                      <button className='search-follow-button'>Follow</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
