import { axiosInstance } from "@/Axios/axios";
import React, { ReactNode, useState } from "react";
import PostBtn from "../PostButton/postbutton";
import { IoImages } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { CiHashtag } from "react-icons/ci";
import { BiPoll } from "react-icons/bi";
import style from "./style.module.css"
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
        <div className={style["thread-overlay"]}>
            <div className={style["thread-modal"]}>
                <button onClick={onClose} className={style["thread-closeButton"]}>
                    &times;
                </button>

                <div className={style["thread-content"]}>
                    {children}
                    <div className={style["thread-thread"]}>
                        <textarea
                            name="thread"
                            id="thread"
                            placeholder="Write a post"
                            value={postContent}
                            onChange={handlePostChange}
                            className={style["thread-textarea"]}
                        />
                        {preview && (
                            <div className={style["thread-image-preview-container"]}>
                                <img src={preview} alt="Preview" className={style["thread-image-preview"]} />
                            </div>
                        )}
                        <div className={style["thread-file-upload-container"]}>
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={style["thread-file-input"]}
                            />
                            <label htmlFor="file-upload" className={style["thread-file-upload-label"]}>
                                <IoImages className={style["thread-file-upload-label"]}/>
                                <MdOutlineGifBox  className={style["thread-file-upload-label"]}/>
                                <CiHashtag  className={style["thread-file-upload-label"]}/>
                                <BiPoll  className={style["thread-file-upload-label"]}/>
                            </label>
                        </div>
                    </div>
                    <div className={style["thread-post-thread"]}>
                        <PostBtn onClick={handlePostSubmit} />
                    </div>
                </div>
            </div>
        </div>


    );
}
export default Threads