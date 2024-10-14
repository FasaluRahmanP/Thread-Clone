'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CiHeart } from "react-icons/ci";

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
        <button onClick={handleLike} className="comment-likeButton">
            <CiHeart fill={isLiked ? 'red' : 'white'} style={{ fontSize: '23px'}} />
            <span>{like}</span>
        </button>
    )
}

export default LikeButton