import React from 'react'
import style from "./style.module.css"
interface PostBtnProps {
    onClick: () => void
}
const PostBtn: React.FC<PostBtnProps> = ({onClick}) => {

  return (
    <div className={style["postbutton-postBtn"]} onClick={onClick}>
      Post
    </div>
  )
}

export default PostBtn