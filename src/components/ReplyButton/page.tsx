import { FaRegComment } from "react-icons/fa";
import React from 'react'
 interface ReplyButtonProps {
  CommentCount: number
}
 
const ReplyButton: React.FC<ReplyButtonProps> = ({CommentCount}) => {
  return (
    <button className="Comment-replyButton">
      <FaRegComment style={{ fontSize: '18px'}}/>
      <span >{CommentCount}</span>
    </button>
  )
}

export default ReplyButton