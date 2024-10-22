import { FaRegComment } from "react-icons/fa";
import React from 'react'
import style from "./style.module.css"
 interface ReplyButtonProps {
  CommentCount: number
}
 
const ReplyButton: React.FC<ReplyButtonProps> = ({CommentCount}) => {
  return (
    <button className={style["Comment-replyButton"]}>
      <FaRegComment style={{ fontSize: '18px'}}/>
      <span >{CommentCount}</span>
    </button>
  )
}

export default ReplyButton