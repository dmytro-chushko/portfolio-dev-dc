'use client';

import { useUser } from '@auth0/nextjs-auth0';
import clsx from 'clsx';
import { Children, ReactNode } from 'react';

import NavLink from '@/components/ui/NavLink/NavLink';
import { Dictionary } from '@/lib/utils/getDictionary';

type LinkLabelsType =
  | Dictionary['nav']['links']
  | Dictionary['nav']['dashboard'];

type UniLinkLabelsType = Dictionary['nav']['links'] &
  Dictionary['nav']['dashboard'];

type LinksLabelItemType =
  | keyof Dictionary['nav']['links']
  | keyof Dictionary['nav']['dashboard'];

type TopNavigationProps = {
  linkLabels: LinkLabelsType;
  linkPrefix?: string;
  children?: ReactNode;
};

const PROTECTED_ITEMS: LinksLabelItemType[] = ['dc-dashboard'];

const TopNavigation = ({
  linkLabels,
  linkPrefix,
  children,
}: TopNavigationProps) => {
  const { user } = useUser();

  return (
    <nav>
      <ul className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:gap-6">
        {Children.map(children, (child, i) => (
          <li key={i}>{child}</li>
        ))}
        {Object.keys(linkLabels).map((link) => (
          <li
            key={link}
            className={clsx(
              PROTECTED_ITEMS.includes(link as LinksLabelItemType) &&
                !user &&
                'hidden'
            )}
          >
            <NavLink
              label={
                (linkLabels as UniLinkLabelsType)[link as LinksLabelItemType]
              }
              href={`${linkPrefix || ''}${link}`}
              scroll={false}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNavigation;
