import { ReactNode } from "react";

interface ThreadProps{
    isOpen:boolean;
    onClose:()=>void;
    children:ReactNode
}