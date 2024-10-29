'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import ProfileImage from '../ProfileImage/page';
import { axiosInstance } from '@/Axios/axios';
import style from "./style.module.css"
interface ReplyProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  postId: string;
  userId: string;
  userProfilePic: string;
  username: string;
}

const Reply: React.FC<ReplyProps> = ({ isOpen, onClose, children, postId, userId, userProfilePic, username }) => {
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const fetchPost = async () => {
        try {
          const response = await axiosInstance.get(
            `api/posts/post/${postId}`
          );
          setPost(response.data.post);
          console.log('this is a post', post)
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      };
      fetchPost();
    }
  }, [isOpen, postId]);


  const handleReplySubmit = async () => {
    if (!comment.trim()) return;

    const reply = {
      text: comment,
      userId: userId,
      username: username,
      userProfilePic: userProfilePic
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `https://social-media-rest-apis.onrender.com/api/posts/${postId}/reply`,
        reply
      );

      setComment('');
    } catch (error) {
      console.error("Failed to reply to post:", error);
    } finally {
      setLoading(false);
    }
  };



  if (!isOpen) return null;

  return (
    <div className={style['comment-overlay']}>
      <div className={style['comment-modal']}>

        <button className={style['comment-close-btn']} onClick={onClose}>
          &times;
        </button>

        {post && (
          <div className={style["comment-post-content"]}>
            <div className={style["comment-user-info"]}>
              {post.postById.profilePic ? (
                <img
                  src={post.postById.profilePic}
                  alt={`${post.postById.username}'s profile`}
                  className={style["comment-profile-image"]}
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="default profile"
                  className={style["comment-profile-image"]}
                />
              )}
            </div>
            <div>
              <h1 className='h1'style={{color:"white"}}>{post.postById.username}</h1>
              <h2 className='h2'style={{color:"white"}}>{post.text}</h2>
            </div>
            <div className={style["comment-the-line"]}></div>
            {post.image && (
              <div className={style["comment-post-image-container"]}>
                <img
                  src={post.image}
                  alt="Post"
                  className={style["comment-post-image"]}
                />
              </div>
            )}
          </div>
        )}
        <div className={style["comment-user"]}>{children}</div>
        <div className={style["comment-body"]}>
          <textarea
            className={style["comment-body"]}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Reply to..."
          />
        </div>
        <div className={style["comment.footer"]}>
        <button onClick={handleReplySubmit} disabled={loading} className={style["comment-submit-btn"]}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      <div className={style["comment-repliesContainer"]}>
        {post?.replies?.length > 0 ? (
          [...post.replies].map((reply: any, index: number) => (
            <div key={index} className={style["comment.reply"]}>
              <div className={style["comment-reply-user-info"]}>
                <ProfileImage profilePic={reply.userProfilePic
                }
                  altText={reply.username}
                  className={style["comment-profile-image"]}
                />
                <h4 className='h4'style={{color:"white"}}>{reply.username}</h4>
              </div>
              <p className='p' style={{color:"white"}}>{reply.text}</p>
              <br></br>
            </div>
          ))
        ) : (
          <p>No replies yet.</p>
        )}
      </div>

    </div>
    </div >
  )
}
export default Reply;

