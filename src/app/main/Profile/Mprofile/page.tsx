"use client"
import { useAppDispatch } from '@/app/Hooks/useAppDispatch'
import { axiosInstance } from '@/Axios/axios'
import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
import ProfileImage from '@/components/ProfileImage/page';
import TimeAgo from '@/components/TimeAgo/page';
// import LikeButton from '@/components/Like/like'
// import ReplyButton from '@/components/ReplyButton/page'
// import RepostButton from '@/components/RepostButton/RepostButton'
import { CgMenuRound } from "react-icons/cg";

const page = () => {
    const dispatch = useAppDispatch
    const [post, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

    type Post = {
        _id: string;
        userProfilePic: string;
        username: string;
        text: string;
        image: string;
        createdOn: string;
        replies: Reply[];
        likes: string[];
        reposts: string[];
    }
    type Reply = {
        _id: string;
        userId: string;
        userProfilePic: string;
        username: string;
        text: string;
    };
    const fetchPosts = async () => {
        try {
            const userId = localStorage.getItem("userId")
            if (userId) {
                const response = await axiosInstance.get(`api/posts/${userId}`)
                setPosts(response.data.post)
            }
        } catch (error) {
            console.log("Error fetching Post", error)
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    const deletePost = async (postId: string) => {
        try {
            await axiosInstance.delete(`api/posts/${postId}`)
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
        } catch (error) {
            console.log("Error in Deleting Post", error)
        }
    }
    const toggleDropdown = (postId: string) => {
        setSelectedPostId(selectedPostId === postId ? null : postId);
    }
    return (
        <div className={styles['post-list']}>
            {post.map((post) => (
                <div key={post._id} className={styles['post-item']}>
                    <div className={styles['post-user']}>
                        <ProfileImage
                            profilePic={post.userProfilePic}
                            altText="Profile"
                            className={styles['profile-image']}
                        />
                        <div className={styles['post-details']}>
                            <h3>{post.username}</h3>
                            <TimeAgo dateString={post.createdOn} />
                        </div>
                        <div className={styles['menu-container']}>
                            <CgMenuRound className={styles['menu']} onClick={() => toggleDropdown(post._id)} />
                            {/* {selectedPostId === post._id && (
                                // <DropdownMenu>
                                //     <button onClick={() => deletePost(post._id)}>Delete</button>
                                // </DropdownMenu>
                            )} */}
                        </div>
                    </div>
                    <p className={styles['post-text']}>{post.text}</p>
                    {post.image && <img src={post.image} alt="post" className={styles['post-image']} />}
                    <div className={styles['post-actions-container']}>
                        {/* <LikeButton
                            initialLike={post.likes.length}
                            postId={post._id}
                            userId={localStorage.getItem('userId')}
                            likedUsers={post.likes}
                        />
                        <ReplyButton
                            replyCount={post.replies.length}
                            openComment={() => setSelectedPostId(post._id)}
                            postId={post._id}
                            setPostId={setSelectedPostId}
                        />
                        <RepostButton
                            repostCount={post.reposts.length}
                            postId={post._id}
                            setPostId={setSelectedPostId}
                            opernRepost={() => setSelectedPostId(post._id)}
                        /> */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default page