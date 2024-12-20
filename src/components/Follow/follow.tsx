import { axiosInstance } from '@/Axios/axios';
import React from 'react';
import styles from "./style.module.css"


interface FollowBtnProps {
    userId: string;
}

const FollowBtn: React.FC<FollowBtnProps> = ({ userId }) => {
    const [isFollowing, setIsFollowing] = React.useState<boolean>(false);
   
    const senderId = localStorage.getItem('userId');
        const checkFollowingStatus = async () => {
            try {
                const res = await axiosInstance.get(`api/users/${userId}`);
                const user = res.data.user;
                if (user.followers.includes(senderId)) {
                    setIsFollowing(true);
                }
            } catch (error) {
                console.error('Error ', error);
            }
        };
         


    const handleFollow = async () => {
        checkFollowingStatus();
        try {
            if (isFollowing) {
                await axiosInstance.post(`api/users/unfollow/${userId}`, { userUnfollowId: senderId });
                setIsFollowing(false);
            } else {
                await axiosInstance.post(`api/users/follow/${userId}`, { userFollowId: senderId });
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Error ', error);
        }
    };

    return (
        <button onClick={handleFollow} className={styles['follow-btn']}>
            {isFollowing ? 'Followed' : 'Follow'}
        </button>
    );
};

export default FollowBtn;