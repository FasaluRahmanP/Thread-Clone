import React from 'react';
import { BiRepost } from "react-icons/bi";
import style from "./style.module.css"

 interface repostButtonProps {
    repostCount: number
 }
const RepostButton: React.FC<repostButtonProps> = ({ repostCount }) => {
  return (
    <button className={style["repostbtn-repostButton"]}>
      <BiRepost style={{ fontSize: '24px'}}/>
      <span>{repostCount}</span>
    </button>
  );
};

export default RepostButton;