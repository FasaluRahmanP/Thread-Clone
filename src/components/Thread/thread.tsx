import { axiosInstance } from "@/Axios/axios";
import React, { ReactNode, useState } from "react";
import PostBtn from "../PostButton/postbutton";
import { IoImages } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { CiHashtag } from "react-icons/ci";
import { BiPoll } from "react-icons/bi";

interface ThreadProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
}
const Threads: React.FC<ThreadProps> = ({ isOpen, onClose, children }) => {
    
    const [postContent, setPostContent] = useState<string>('')
    const [postImage, setPostImage] = useState<any>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const handlePostSubmit = async () => {
        const userId = localStorage.getItem("userId");
        if (postContent.trim() === "") {
            alert("Please write something before posting")
            return
        }
        if (!userId) {
            alert("User not found! Please Log in")
            return
        }
        const newPostFormData = new FormData();
        newPostFormData.append("userId", userId)
        newPostFormData.append("text", postContent)
        newPostFormData.append("image", postImage)


        try {
            console.log("Sending new post data", newPostFormData)
            const response = await axiosInstance.post("api/posts", newPostFormData)
            console.log("Response", response)
        } catch (error) {
            console.error("Error adding new post", error)
        }
        setPostContent("")
        setPostImage(null)
        onClose()
    }

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value)
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0];
        if (file) {
            setPostImage(file)
            const reader = new FileReader()
            console.log("File", file)
            reader.onload = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    if (!isOpen) return null

    return (
        <div className="thread-overlay">
            <div className="thread-modal">
                <button onClick={onClose} className="thread-closeButton">
                    &times;
                </button>

                <div className="thread-content">
                    {children}
                    <div className="thread-thread">
                        <textarea
                            name="thread"
                            id="thread"
                            placeholder="Write a post"
                            value={postContent}
                            onChange={handlePostChange}
                            className="thread-textarea"
                        />
                        {preview && (
                            <div className="thread-image-preview-container">
                                <img src={preview} alt="Preview" className="thread-image-preview" />
                            </div>
                        )}
                        <div className="thread-file-upload-container">
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="thread-file-input"
                            />
                            <label htmlFor="file-upload" className="thread-file-upload-label">
                                <IoImages className="thread-file-upload-label"/>
                                <MdOutlineGifBox  className="thread-file-upload-label"/>
                                <CiHashtag  className="thread-file-upload-label"/>
                                <BiPoll  className="thread-file-upload-label"/>
                            </label>
                        </div>
                    </div>
                    <div className="thread-post-thread">
                        <PostBtn onClick={handlePostSubmit} />
                    </div>
                </div>
            </div>
        </div>


    );
}
export default Threads