"use client"
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../Hooks/useAppDispatch';
import { fetchPosts } from '../Store/Reducer/PostSlice';
import { fetchuser } from '../Store/Reducer/UserSlice';
import TimeAgo from '@/components/TimeAgo/page';

const Page = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { posts } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchuser())
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <>
      <nav><h1 className='main-heading'>For you</h1></nav>
      <div className="flex items-center justify-center h-screen">
        <div className="h-full w-6/12 bg-[#201d1d] rounded-3xl">
          <div className='main-posts-container'>
            <div className='main-new-container'>
              <div className='main-new'>
                <div className='main-dp'>
                </div>
                <div className='main-text'>
                  <span>What's new?</span>
                </div>
              </div>
              <button className='main-post-button'>Post</button>
            </div>

            <div className='main-post-list'>
              {posts.map((post) => (
                <div key={post._id} className='main-post-item'>
                  <div className='main-post-user'>
                    <img src={post.postById?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt="profile" className='main-profile-image'></img>
                    <div className='main-text-username'>
                      <div className='main-username-time'>
                        <p className='main-profile-name'>{post.postById.username}</p>
                        <span className='main-time'>
                          <TimeAgo dateString={post.createdOn}></TimeAgo>
                        </span>
                      </div>
                      <p className='main-post-text'>{post.text}</p>
                    </div>
                  </div>
                  {post.image && <img src={post.image} alt='Post' className='main-post-image'/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
