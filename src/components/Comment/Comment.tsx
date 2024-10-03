import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import ProfileImage from "../ProfileImage/page";
import { axiosInstance } from "@/Axios/axios";

interface CommentProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  postId: string;
  userId: string;
  userProfilePic: string;
  username: string;
}

const Comment: React.FC<CommentProps> = ({
  isOpen,
  onClose,
  children,
  postId,
  userId,
  userProfilePic,
  username,
}) => {
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (isOpen) {
      const fetchPost = async () => {
           try {
          const response = await axiosInstance.get(
            `api/posts/post/${postId}`
          );
          setPost(response.data.post);
          console.log("This is a Post", response.data.post);
        } catch (error) {
          console.log("Failed to Fetch Post", error);
        }
      };
      fetchPost();
    }
  }, [isOpen, postId]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    const reply = {
      text: comment,
      userId: userId,
      username: username,
      userProfilePic: userProfilePic,
    };
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `api/posts/${postId}/reply`,
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
    <div className='comment-overlay'>
      <div className='comment-modal'>

        <button className='comment-close-btn' onClick={onClose}>
          &times;
        </button>

        {post && (
          <div className="comment-post-content">
            <div className="comment-user-info">
              {post.postById.profilePic ? (
                <img
                  src={post.postById.profilePic}
                  alt={`${post.postById.username}'s profile`}
                  className="comment-profile-image"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="default profile"
                  className="comment-profile-image"
                />
              )}
            </div>
            <div>
              <h1>{post.postById.username}</h1>
              <h2>{post.text}</h2>
            </div>
            <div className="comment-the-line"></div>
            {post.image && (
              <div className="comment-post-image-container">
                <img
                  src={post.image}
                  alt="Post"
                  className="comment-post-image"
                />
              </div>
            )}
          </div>
        )}
        <div className="comment-user">{children}</div>
        <div className="comment-body">
          <textarea
            className="comment-body"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Reply to..."
          />
        </div>
        <div className="comment.footer">
          <button onClick={handleCommentSubmit} disabled={loading} className="comment-submit-btn">
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
        <div className="comment-repliesContainer">
          {post?.replies?.length > 0 ? (
            post.replies.map((reply: any, index: number) => (
              <div key={index} className="comment.reply">
                <div className="comment-reply-user-info">
                  <ProfileImage profilePic={reply.userProfilePic
                  }
                    altText={reply.username}
                    className="comment-profile-image"
                  />
                  <h4>{reply.username}</h4>
                </div>
                <p>{reply.text}</p>
                <br></br>
              </div>
            ))
          ) : (
            <p>No replies yet.</p>
          )}
        </div>

      </div>
    </div>
  )
}
export default Comment;
