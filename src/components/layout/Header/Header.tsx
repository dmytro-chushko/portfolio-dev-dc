import NavLink from '@/components/ui/NavLink/NavLink';

type HeaderProps = {
  linkLabels: Record<string, string>;
};

const Header = ({ linkLabels }: HeaderProps) => {
  return (
    <>
      <div className="flex">
        {Object.keys(linkLabels).map((link) => (
          <NavLink key={link} label={linkLabels[link]} href={`#${link}`} />
        ))}
      </div>
    </>
  );
};

export default Header;
