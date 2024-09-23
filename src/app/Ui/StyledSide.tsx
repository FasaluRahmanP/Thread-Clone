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
      className={`hover:bg-[#FFFFFF0D] h-16 w-16 rounded-xl flex items-center justify-center ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default StyledButton;
