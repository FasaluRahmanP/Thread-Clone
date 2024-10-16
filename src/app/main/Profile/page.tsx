"use client"
import { axiosInstance } from '@/Axios/axios';
import ProfileImage from '@/components/ProfileImage/page';
import TimeAgo from '@/components/TimeAgo/page';
import React, { useEffect, useState } from 'react';

const Page = () => {

  const [posts, setPosts] = useState<Post[]>([])

  type Post = {
    _id: string
    text: string
    image?: string
    likes: string[]
    replies: Reply[]
    createdOn: string
    reposts: string[]
    username: string
    userProfilePic: string
  }

  type Reply = {
    _id: string
    UserId: string
    userProfilePic: string
    username: string
    text: string
  }

  const fetchPosts = async () => {
    try {
      const userId = localStorage.getItem("userId")
      if (userId) {
        const response = await axiosInstance.get(`api/posts/${userId}`)
        setPosts(response.data.post)

      }
    } catch (error) {
      console.error("Failed to FetchPost", error)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  return (
    <>
      <nav className='main-nav'><h1 className='main-heading'>Profile</h1></nav>
      <div className="flex items-center justify-center h-screen">
        <div className="h-full w-6/12 bg-[#201d1d] rounded-3xl mt-11">
          <div className='profile-list'>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className='profile-item'>
                  <div className='profile-user'>
                    <ProfileImage
                      profilePic={post.userProfilePic}
                      altText='Profile'
                      className='profile-image'
                    />
                    <div className='post-details'>
                      <h3>{post.username}</h3>
                      <TimeAgo dateString={post.createdOn}></TimeAgo>
                    </div>
                    <div className='profile-menu-container'>
                      
                    </div>
                  </div>
                </div>
              ))
            ) : (<p>No posts available</p>)}

          </div>
        </div>
      </div>
    </>
  );
}

export default Page;