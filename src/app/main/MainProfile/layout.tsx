import Profile from '@/components/Profile/profile';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Profile />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
