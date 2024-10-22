"use client"
import { useAppDispatch, useAppSelector } from '@/app/Hooks/useAppDispatch';
import { fetchNotification } from '@/app/Store/Reducer/NotificationSlice';
import ProfileImage from '@/components/ProfileImage/page';
import React, { useEffect } from 'react';
import style from "./style.module.css"
const Page = () => {
    const dispatch = useAppDispatch();
    const { notifications, status, error } = useAppSelector((state) => state.NotificationSL);


    useEffect(() => {
        dispatch(fetchNotification());
    }, [dispatch]);
    // console.log(notifications)
    return (
        <>
            <nav className={style['main-nav']}><h1 className={style['main-heading']}>Activity</h1></nav>
            <div className="flex items-center justify-center h-screen mt-20">
                <div className="h-auto w-6/12 bg-[#181818] rounded-3xl mt-auto">
                    {error && <div className={style['activity-error']}>{error}</div>}
                    {notifications.length === 0 && status !== "Loading" && !error && (
                        <div>No Notification Available</div>
                    )}
                    {status === "Loading" && <div>Loading Notification...</div>}
                    {notifications.map((notification) => (
                        <div key={notification.id} className={style['activity-notification']}>
                            <div className={style['activity-senderinfo']}>
                                <div className={style['activity-ProfilePicContainer']}>
                                    <ProfileImage
                                        profilePic={notification.senderUserId.profilePic}
                                        altText='Profile'
                                        className={style['activity-profilepic']}
                                    />
                                </div>
                                <div className={style['activity-sendername']}>
                                    <div className={style['activity-sender']}>
                                        {notification.senderUserId.name}
                                    </div>
                                    <div>{notification.description}</div>
                                </div>
                            </div> <button className={style['search-follow-button']}>Follow</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Page;