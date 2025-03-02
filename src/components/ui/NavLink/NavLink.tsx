import Link from 'next/link';

type INavLinkProps = {
  label: string;
  href: string;
};

const NavLink = ({ label, href }: INavLinkProps) => {
  return (
    <Link href={href} className="">
      {label}
    </Link>
  );
};

export default NavLink;
