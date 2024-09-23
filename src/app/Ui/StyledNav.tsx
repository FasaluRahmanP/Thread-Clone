import React from 'react';

interface StyledButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({ onClick, children, className, ariaLabel }) => {
  return (
    <button 
      onClick={onClick} 
      className={`hover:bg-[#FFFFFF0D] h-16 w-20 pl-7 rounded-xl ${className}`} 
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default StyledButton;
