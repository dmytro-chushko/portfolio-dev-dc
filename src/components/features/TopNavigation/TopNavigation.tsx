import NavLink from '@/components/ui/NavLink/NavLink';

type TopNavigationProps = {
  linkLabels: Record<string, string>;
};

const TopNavigation = ({ linkLabels }: TopNavigationProps) => {
  return (
    <nav>
      <ul className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:gap-6">
        {Object.keys(linkLabels).map((link) => (
          <NavLink key={link} label={linkLabels[link]} href={`#${link}`} />
        ))}
      </ul>
    </nav>
  );
};

export default TopNavigation;
