import NavLink from '@/components/ui/NavLink/NavLink';
import './header.css';
import Socials from '@/components/ui/Socials/Socials';

type HeaderProps = {
  linkLabels: Record<string, string>;
};

const Header = ({ linkLabels }: HeaderProps) => {
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
        <div className="flex flex-col gap-6 md:flex-row md:w-full md:justify-between md:p-6">
          <ul className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-6">
            {Object.keys(linkLabels).map((link) => (
              <NavLink key={link} label={linkLabels[link]} href={`#${link}`} />
            ))}
          </ul>
          <Socials />
        </div>
      </div>
    </>
  );
};

export default Header;
