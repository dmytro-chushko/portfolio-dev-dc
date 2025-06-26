import { ReactNode } from 'react';

import './header.css';

type HeaderProps = {
  children: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="lg:sticky lg:top-0 lg:backdrop-blur z-50">
      <input
        type="checkbox"
        id="toggle-menu-button"
        className="opacity-0 w-6 h-6 fixed top-6 right-6 z-50 cursor-pointer lg:hidden"
      />
      <div className="w-6 h-6 fixed top-6 right-6 z-40 cursor-pointer lg:hidden">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        id="toggle-menu"
        className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-background opacity-0 z-30 transition-opacity duration-500 pointer-events-none lg:bg-transparent lg:sticky lg:opacity-100 lg:pointer-events-auto"
      >
        <div className="flex flex-col gap-6 lg:container lg:flex-row lg:w-full lg:justify-between lg:items-center lg:py-6 lg:px-4">
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;
