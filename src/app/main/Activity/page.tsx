import ProfileImage from '@/components/ProfileImage/page';
import React, { useEffect } from 'react';
import style from "./style.module.css";
import { getUserId } from '@/Library/utilities/getCookies';
import { axiosInstance } from '@/Axios/axios';

interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePic: string | any;
    notification: any;
}

interface Notification {
    id: string;
    description: string;
    senderUserId: User;
}

async function getNotification() {
    const userId = getUserId();
    console.log(userId)
    const res = await axiosInstance.get(`api/users/notification/${userId}`);
    console.log(res.data)
    return res.data.notifications;
}

export default async function ActivityPage() {
    let notifications: Notification[] = [];
    try {
        notifications = await getNotification();
        console.log(notifications);
    } catch (error) {
        console.error(error);
    }

    return (
        <>
            <nav className={style['main-nav']}>
                <h1 className={style['main-heading']}>Activity</h1>
            </nav>
            <div className="flex items-center justify-center h-screen mt-20">
                <div className="h-auto w-6/12 bg-[#181818] rounded-3xl mt-auto">
                    {notifications.length === 0 ? (
                        <p style={{color:"white"}}>No Notification Available</p>
                    ) : (
                        notifications.map((notification) => (
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
                                </div>
                                {/* <button className={style['search-follow-button']}>Follow</button> */}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
