import { ReactNode } from 'react';

import './header.css';

type HeaderProps = {
  children: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-menu-button"
        className="opacity-0 w-6 h-6 fixed top-6 right-6 z-50 md:hidden"
      />
      <div className="w-6 h-6 fixed top-6 right-6 z-40 md:hidden">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        id="toggle-menu"
        className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-background opacity-0 z-30 transition-opacity duration-500 pointer-events-none md:sticky md:opacity-100 md:pointer-events-auto"
      >
        <div className="flex flex-col gap-6 md:flex-row md:w-full md:justify-between md:items-center md:p-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default Header;
