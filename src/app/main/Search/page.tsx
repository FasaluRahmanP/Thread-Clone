"use client";
import { useAppDispatch, useAppSelector } from '@/app/Hooks/useAppDispatch';
import { fetchuser } from '@/app/Store/Reducer/UserSlice';
import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import style from "./style.module.css"

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
      <nav className={style['main-nav']}><h1 className={style['main-heading']}>Search</h1></nav>
      <div className="flex items-center justify-center h-auto">
        <div className="h-auto w-6/12 bg-[#181818] rounded-3xl mt-11">
          <div className={style['search-bar']}>
            <IoSearch style={{ color: "grey", fontSize: "20px" }} />
            <input
              type='text'
              placeholder='Search'
              className={style['search-input']}
              onChange={handleSearchChange}
            />
          </div>
          <p className={style['search-suggestions']}>Follow suggestions</p>
          <div className={style['search-result']}>
            {filteredUsers.length > 0 ? (
              [...filteredUsers].map(user => (
                <div key={user._id} className={style["search-result-item"]}>
                  <div className={style['search-post-user']}>
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt='Profile'
                        className={style['search-profile-image']}
                      />
                    ) : (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="profile"
                        className={style['search-profile-image']}
                      />
                    )}
                    <div className={style['search-user-details']}>
                      <div className={style['search-user-info']}>
                        <p className={style['search-post-text']}>{user.name}</p>
                        <p className={style['search-profile-name']}>{user.username}</p>
                        <p className={style['search-followers']}>{user.followers.length} followers</p>
                      </div>
                      <button className={style['search-follow-button']}>Follow</button>
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
