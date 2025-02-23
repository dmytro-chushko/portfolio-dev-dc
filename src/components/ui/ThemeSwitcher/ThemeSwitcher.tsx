'use client';
import React, { useEffect } from 'react';

type ThemeType = 'light' | 'dark' | 'system';

const themeArray: ThemeType[] = ['light', 'dark', 'system'];

const isValidTheme = (value: string | null): value is ThemeType => {
  return value !== null && themeArray.some((theme) => theme === value);
};

type ThemeSwitcherProps = {
  themes: {
    dark: string;
    light: string;
    system: string;
  };
};

function ThemeSwitcher({ themes }: ThemeSwitcherProps) {
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
        localStorage.setItem('isDark', selectedTheme);
      }
    }
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem('isDark');

    if (isValidTheme(currentTheme)) {
      themeHandlers[currentTheme]();
      localStorage.setItem('isDark', currentTheme);
    } else {
      themeHandlers.system();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="inline-flex justify-between gap-1">
      {themeArray.map((theme) => (
        <button key={theme} data-theme={theme} onClick={handleClick}>
          {themes[theme]}
        </button>
      ))}
    </div>
  );
}

export default ThemeSwitcher;
