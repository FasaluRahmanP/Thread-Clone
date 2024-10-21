"use client"
import { useAppDispatch, useAppSelector } from '@/app/Hooks/useAppDispatch';
import { fetchNotification } from '@/app/Store/Reducer/NotificationSlice';
import ProfileImage from '@/components/ProfileImage/page';
import React, { useEffect } from 'react';

const Page = () => {
    const dispatch = useAppDispatch();
    const { notifications, status, error } = useAppSelector((state) => state.NotificationSL);


    useEffect(() => {
        dispatch(fetchNotification());
    }, [dispatch]);
    // console.log(notifications)
    return (
        <>
            <nav className='main-nav'><h1 className='main-heading'>Activity</h1></nav>
            <div className="flex items-center justify-center h-screen mt-20">
                <div className="h-auto w-6/12 bg-[#201d1d] rounded-3xl mt-auto">
                    {error && <div className='activity-error'>{error}</div>}
                    {notifications.length === 0 && status !== "Loading" && !error && (
                        <div>No Notification Available</div>
                    )}
                    {status === "Loading" && <div>Loading Notification...</div>}
                    {notifications.map((notification) => (
                        <div key={notification.id} className='activity-notification'>
                            <div className='activity-senderinfo'>
                                <div className='activity-ProfilePicContainer'>
                                    <ProfileImage
                                        profilePic={notification.senderUserId.profilePic}
                                        altText='Profile'
                                        className='activity-profilepic'
                                    />
                                </div>
                                <div className='activity-sendername'>
                                    <div className='activity-sender'>
                                        {notification.senderUserId.name}
                                    </div>
                                    <div>{notification.description}</div>
                                </div>
                            </div> <button className='search-follow-button'>Follow</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Page;