'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/Hooks/useAppDispatch';
import { fetchuser } from '@/app/Store/Reducer/UserSlice';
import ProfileImage from '@/components/ProfileImage/page';
import EditProfile from '../../app/main/EditProfile/page';
import style from "./style.module.css"

const Profile = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const [name, setName] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string>('');
  const [followers, setfollowers] = useState<string>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [userBio, setUserBio] = useState<string>('');

  useEffect(() => {
    dispatch(fetchuser());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId && users.length > 0) {
      const user = users.find((user) => user._id === userId);
      if (user) {
        setName(user.name || '');
        setUserName(user.username || '');
        setProfilePic(user.profilePic || '');
        setUserBio(user.bio || '');
        setfollowers(user.followers[followers.length] || '');
      }
    }
  }, [users]);


  const handleEditProfileOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <nav className={style['main-nav']}><h1 className={style['main-heading']}>For you</h1></nav>
      <div className="flex items-center justify-center h-96">
        <div className="h-full w-6/12 bg-[#181818] rounded-3xl">
          <EditProfile isOpen={isEditModalOpen} onClose={handleEditProfileClose} />
          <div className={style["profile-container"]}>
            <div className={style["profile-details"]}>

              <h1 className={style['profile-name']}>{name}</h1>
              <span className={style['profile-username']}>{username}</span>

              <p className={style["profile-discrption"]}>
                {userBio}
              </p>
              <p className={style['profile-followers']}>{followers.length} followers</p>

            </div>

            <div className={style["profile-image"]}>
              <ProfileImage
                altText="Profile"
                profilePic={profilePic}
                className={style["profile-img"]}
              />
            </div>
            <div className={style["edit-profile"]}>
              <div
                className={style["edit-button"]}
                onClick={handleEditProfileOpen}
              >
                Edit profile
              </div>
            </div>

            <div className={style["profile-state"]}>
              <div className={style["profile-statediv"]}>
                <Link href={'/main/Profile/Mprofile'}>Threads</Link>
              </div>
              <div className={style["profile-statediv"]}>
               <div>Replies</div>
              </div>
              <div className={style["profile-statediv"]}>
              <div>Reposts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;