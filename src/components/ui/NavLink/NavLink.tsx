import Link from 'next/link';

type INavLinkProps = {
  label: string;
  href: string;
};

const NavLink = ({ label, href }: INavLinkProps) => {
  return (
    <Link
      href={href}
      className="text-xl md:hover:text-hovered transition-colors"
    >
      {label}
    </Link>
  );
};

export default NavLink;
