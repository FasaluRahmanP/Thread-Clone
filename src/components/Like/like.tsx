'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaHeart } from "react-icons/fa6";
import style from "./style.module.css"

interface LikeButtonProps {
    initialLike: number
    postId: string
    userId: string
    likedUsers: string[]  
}

const LikeButton = ({ initialLike, postId, userId, likedUsers }: LikeButtonProps) => {
    const [like, setLike] = useState(initialLike)
    const [isLiked, setIsLiked] = useState(false)
    useEffect(() => {
        if (likedUsers.includes(userId)) {
            setIsLiked(true)
        }
    }, [likedUsers, userId])

    const handleLike = async () => {
        const updatedLike = isLiked ? like - 1 : like + 1
        setLike(updatedLike)
        setIsLiked(!isLiked)

        try {
            
            const endpoint = isLiked 
                ? `https://social-media-rest-apis.onrender.com/api/posts/unlike/${postId}` 
                : `https://social-media-rest-apis.onrender.com/api/posts/like/${postId}`

            const response = await axios.post(endpoint, { userId })
            console.log('Response:', response)

            if (response.status !== 200) {
                throw new Error('Failed to update like on the server.')
            }
        } catch (error) {
            console.error('Error updating like:', error)
    
            setLike(isLiked ? like + 1 : like - 1)
            setIsLiked(isLiked)
        }
    }

    return (
        <button onClick={handleLike} className={style["comment-likeButton"]}>
            <FaHeart color={isLiked ? '#FF0034' :"white"}className={style['comment-like-icon']} />
            <span style={{marginLeft:"6px"}}>{like}</span>
        </button>
    )
}

export default LikeButton