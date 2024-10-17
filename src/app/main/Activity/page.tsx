"use client"
import { useAppDispatch, useAppSelector } from '@/app/Hooks/useAppDispatch';
import { fetchNotification } from '@/app/Store/Reducer/NotificationSlice';
import ProfileImage from '@/components/ProfileImage/page';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const dispatch = useAppDispatch();
  const { notification = [], status, error } = useAppSelector((state) => state.Notification); // Default to empty array
  const [showNotifications, setShowNotifications] = useState(10);

  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  const loadMoreNotifications = () => {
    if (showNotifications < notification.length) {
      setShowNotifications((prev) => Math.min(prev + 10, notification.length));
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottomPosition = document.documentElement.scrollHeight - 100;
    if (scrollPosition >= bottomPosition) {
      loadMoreNotifications();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className='main-nav'><h1 className='main-heading'>Activity</h1></nav>
      <div className="flex items-center justify-center h-screen">
        <div className="h-full w-6/12 bg-[#201d1d] rounded-3xl">
          {error && <div className='activity-error'>{error}</div>}
          {notification.length === 0 && status !== "Loading" && !error && (
            <div>No Notification Available</div>
          )}
          {status === "Loading" && <div>Loading Notification...</div>}
          {notification.map((notification) => (
            <div key={notification.id} className='activity-notification'>
              <div className='activity-senderinfo'>
                <div className='activity-ProfilePicContainer'>
                  <ProfileImage
                    profilePic={notification.senderuserId.profilePic}
                    altText='Profile'
                    className='activity-profilepic'
                  />
                </div>
                <div className='activity-sendername'>
                  <div className='activity-sender'>
                    {notification.senderuserId.name}
                  </div>
                  <div>{notification.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Page;