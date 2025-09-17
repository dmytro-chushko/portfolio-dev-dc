import Link from 'next/link';

type INavLinkProps = {
  label: string;
  href: string;
  scroll?: boolean;
  onClick?: () => void;
};

const NavLink = ({ label, href, onClick }: INavLinkProps) => {
  return (
    <Link
      href={href}
      className="text-xl md:hover:text-hovered transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default NavLink;
