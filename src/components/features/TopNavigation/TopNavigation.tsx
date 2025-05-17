import { Children, ReactNode } from 'react';

import NavLink from '@/components/ui/NavLink/NavLink';

type TopNavigationProps = {
  linkLabels: Record<string, string>;
  linkPrefix?: string;
  children?: ReactNode;
};

const TopNavigation = ({
  linkLabels,
  linkPrefix,
  children,
}: TopNavigationProps) => {
  return (
    <nav>
      <ul className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:gap-6">
        {Children.map(children, (child, i) => (
          <li key={i}>{child}</li>
        ))}
        {Object.keys(linkLabels).map((link) => (
          <li key={link}>
            <NavLink
              label={linkLabels[link]}
              href={`${linkPrefix || ''}${link}`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNavigation;
