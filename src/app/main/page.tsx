"use client"
import React, { useEffect, useId, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../Hooks/useAppDispatch';
import { fetchPosts } from '../Store/Reducer/PostSlice';
import { fetchuser } from '../Store/Reducer/UserSlice';
import TimeAgo from '@/components/TimeAgo/page';
import ProfileImage from '@/components/ProfileImage/page';
import Reply from '@/components/Reply/page';
import LikeButton from '@/components/Like/like';
import Threads from "@/components/Thread/thread"
import { FaHeart } from "react-icons/fa6";
import PostBtn from '@/components/PostButton/postbutton';
import ReplyButton from '@/components/ReplyButton/page';
import RepostButton from '@/components/RepostButton/RepostButton';
import Repost from '@/components/Repost/repost';

const Page = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { posts } = useAppSelector((state) => state.posts);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userId, setUserId] = useState<string>('');
  const [userProfilePic, setProfilePic] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [postId, setPostId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRepostOpen, setIsRepostOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openComment = () => setIsCommentOpen(true);
  const closeComment = () => setIsCommentOpen(false);
  const openRepost = () => setIsRepostOpen(true);
  const closeRepost = () => setIsRepostOpen(false);

  useEffect(() => {
    dispatch(fetchuser())
    dispatch(fetchPosts())
  }, [dispatch])

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId && users.length > 0) {
      const user = users.find((user) => user._id === userId);
      if (user) {
        setCurrentUser(user);
        setUserName(user.username || '');
      }
    }
    console.log(userId)
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser._id);
      if (currentUser.profilePic) {
        setProfilePic(currentUser.profilePic);
      } else {
        setProfilePic('https://cdn-icons-png.flaticon.com/512/149/149071.png');
      }
    }
  }, [currentUser]);
  // console.log('this',userId);

  return (
    <>
      <Threads isOpen={isModalOpen} onClose={closeModal}>
        <div className="thread-dp">
          <img
            src={currentUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="profile"
            className="thread-profile-image"
          />
          <p className="thread-profile-name">{username}</p>
        </div>

      </Threads>

      <Reply
        isOpen={isCommentOpen}
        onClose={closeComment}
        postId={postId}
        userProfilePic={userProfilePic}
        userId={userId}
        username={username}
      >
        <div>
          <div>
            <img src={currentUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt='Profile'
              className='main-profile-image' />
            <p className='main-profile-name'>{username}</p>
          </div>
        </div>
      </Reply>
      <nav className='main-nav'><h1 className='main-heading'>For you</h1></nav>
      <div className="flex items-center justify-center h-screen">
        <div className="h-full w-6/12 bg-[#181818] rounded-3xl">
          <div className='main-posts-container'>
            <div className='main-new-container'>
              <div className='main-new'>
                <div className='main-dp'>
                  <ProfileImage
                    profilePic={currentUser?.profilePic}
                    altText="profile"
                    className='main-profile-image'
                  />
                </div>
                <div className='main-text'>
                  <span>What's new?</span>
                </div>
              </div>
              {/* <button className='main-post-button'>Post</button> */}
              <PostBtn onClick={openModal}></PostBtn>
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
                  {post.image && <img src={post.image} alt='Post' className='main-post-image' />}
                  <div className='main-post-icons'>
                    {currentUser ? (
                      <LikeButton
                        initialLike={post.likes.length}
                        postId={post._id}
                        userId={currentUser._id}
                        likedUsers={post.likes}
                      ></LikeButton>
                    ) : (
                      <FaHeart className='comment-likeButton' style={{ fontSize: "20px" }} />
                      // <p>login</p>
                    )}
                    <br></br>
                    <div className='main-reply' onClick={() => {
                      openComment();
                      setPostId(post._id)
                    }}>
                      <ReplyButton CommentCount={post.replies.length}></ReplyButton>
                    </div>
                    <div onClick={() => { setPostId(post._id); openRepost() }}>
                      <RepostButton repostCount={post.reposts.length} />
                    </div>
                    <Repost
                    isOpen={isRepostOpen}
                    onClose={closeRepost}
                    postId={postId}
                    userId={userId}
                    userProfilePic={userProfilePic}
                    username={username}
                    ></Repost>
                  </div>
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
