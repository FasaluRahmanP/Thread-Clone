import React from 'react'
interface PostBtnProps {
    onClick: () => void
}
const PostBtn: React.FC<PostBtnProps> = ({onClick}) => {

  return (
    <div className="postbutton-postBtn" onClick={onClick}>
      Post
    </div>
  )
}

export default PostBtn