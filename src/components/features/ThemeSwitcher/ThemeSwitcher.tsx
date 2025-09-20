'use client';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import IconSystem from '@/components/icons/theme/monitor.svg';
import IconMoon from '@/components/icons/theme/moon.svg';
import IconSun from '@/components/icons/theme/sun.svg';

type ThemeType = 'light' | 'dark' | 'system';

const themeArray: { id: ThemeType; icon: React.JSX.Element }[] = [
  { id: 'light', icon: <IconSun className="fill-current w-6 h-6" /> },
  { id: 'dark', icon: <IconMoon className="fill-current w-6 h-6" /> },
  { id: 'system', icon: <IconSystem className="fill-current w-6 h-6" /> },
];

const isValidTheme = (value: string | null): value is ThemeType => {
  return value !== null && themeArray.some((theme) => theme.id === value);
};

type ThemeSwitcherProps = {
  themes: {
    dark: string;
    light: string;
    system: string;
  };
};

function ThemeSwitcher({ themes }: ThemeSwitcherProps) {
  const [activeTheme, setActiveTheme] = useState<ThemeType>('system');
  const themeHandlers = {
    light: () => document.documentElement.classList.remove('dark'),
    dark: () => document.documentElement.classList.add('dark'),
    system: () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark'),
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;

    if (target instanceof HTMLButtonElement) {
      const selectedTheme = target.dataset.theme;

      if (selectedTheme && isValidTheme(selectedTheme)) {
        themeHandlers[selectedTheme]();
        setActiveTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
      }
    }
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');

    if (isValidTheme(currentTheme)) {
      themeHandlers[currentTheme]();
      setActiveTheme(currentTheme);
    } else {
      themeHandlers.system();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="inline-flex lg:justify-between max-lg:gap-4 gap-1">
      {themeArray.map(({ id, icon }) => (
        <button
          className={clsx(
            'rounded-full p-2 disabled:bg-active',
            activeTheme !== id && 'md:hover:text-hovered'
          )}
          key={id}
          disabled={activeTheme === id}
          data-theme={id}
          aria-label={themes[id]}
          onClick={handleClick}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}

export default ThemeSwitcher;
