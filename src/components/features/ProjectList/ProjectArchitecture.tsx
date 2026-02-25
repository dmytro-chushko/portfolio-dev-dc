'use client';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import clsx from 'clsx';

import TechIconFactory from '@/components/ui/TechIconFactory/TechIconFactory';
import { ArchitectureType } from '@/lib/types/ArchitectureType';

const ARCHITECTURE_KEYS: (keyof ArchitectureType)[] = [
  'frontend',
  'backend',
  'dataSources',
  'hosting',
  'search',
  'seo',
];

const LABEL_MAP: Record<keyof ArchitectureType, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  dataSources: 'Data sources',
  hosting: 'Hosting',
  search: 'Search',
  seo: 'SEO',
};

type ProjectArchitectureProps = {
  architecture: ArchitectureType;
  buttonLabel: string;
};

const ProjectArchitecture = ({
  architecture,
  buttonLabel,
}: ProjectArchitectureProps) => {
  const entries = ARCHITECTURE_KEYS.filter(
    (key) => architecture[key] != null && architecture[key]
  );

  if (entries.length === 0) return null;

  return (
    <Disclosure as="div" className="mt-2">
      <div
        className={clsx(
          'grid transition-[grid-template-rows] duration-400  ease-out',
          'grid-rows-[auto_0fr] [&:has([data-headlessui-state~=open])]:grid-rows-[auto_1fr]'
        )}
      >
        <div>
          <DisclosureButton
            className={clsx(
              'group flex items-center gap-1 text-sm font-medium text-foreground',
              'hover:text-foreground/80 transition-colors'
            )}
          >
            {buttonLabel}
            <svg
              className="size-4 transition-transform group-data-[open]:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </DisclosureButton>
        </div>
        <div className="min-h-0 overflow-hidden">
          <DisclosurePanel
            unmount={false}
            as="div"
            className="!block min-h-0 origin-top transition duration-400 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
            transition
          >
            <div className="mt-2 pt-2 border-t border-foreground/20 space-y-1 text-sm text-foreground/90">
              {entries.map((key) => (
                <div key={key} className="flex items-end flex-wrap gap-1">
                  <span className="font-bold text-base underline">
                    {LABEL_MAP[key]}:{' '}
                  </span>{' '}
                  {architecture[key]?.map((item, i, arr) => (
                    <span
                      key={`${key}${item.label}`}
                      className="flex items-end gap-1"
                    >
                      {item.tech && (
                        <TechIconFactory techName={item.tech} size={16} />
                      )}
                      {item.label}
                      {i !== arr.length - 1 ? ',' : ';'}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </div>
      </div>
    </Disclosure>
  );
};

export default ProjectArchitecture;
