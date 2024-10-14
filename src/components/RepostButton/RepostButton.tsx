import React from 'react';
import { BiRepost } from "react-icons/bi";

 interface repostButtonProps {
    repostCount: number
 }
const RepostButton: React.FC<repostButtonProps> = ({ repostCount }) => {
  return (
    <button className="repostbtn-repostButton">
      <BiRepost style={{ fontSize: '24px'}}/>
      <span>{repostCount}</span>
    </button>
  );
};

export default RepostButton;