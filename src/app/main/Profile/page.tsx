'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/Hooks/useAppDispatch';
import { fetchuser } from '@/app/Store/Reducer/UserSlice';
import ProfileImage from '@/components/ProfileImage/page';

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
      <nav className='main-nav'><h1 className='main-heading'>For you</h1></nav>
      <div className="flex items-center justify-center h-screen">
        <div className="h-full w-6/12 bg-[#181818] rounded-3xl">
          {/* <EditProfile isOpen={isEditModalOpen} onClose={handleEditProfileClose} /> */}
          <div className="profile-container">
            <div className="profile-details">

              <h1 className='profile-name'>{name}</h1>
              <span className='profile-username'>{username}</span>

              <p className="profile-discrption">
                {userBio}
              </p>
              <p className='profile-followers'>{followers.length} followers</p>

            </div>

            <div className="profile-image">
              <ProfileImage
                altText="Profile"
                profilePic={profilePic}
                className="profile-img"
              />
            </div>
            <div className="edit-profile">
              <div
                className="edit-button"
                onClick={handleEditProfileOpen}
              >
                Edit profile
              </div>
            </div>

            <div className="profile-state">
              <div className="profile-statediv">
                <Link href={'/main/Profile'}>Threads</Link>
              </div>
              <div className="profile-statediv">
                <Link href={'/main/Profile/replies'}>Replies</Link>
              </div>
              <div className="profile-statediv">
                <Link href={'/main/Profile/reposts'}>Reposts</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;