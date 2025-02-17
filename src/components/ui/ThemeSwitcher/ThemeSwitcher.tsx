'use client';
import React, { useEffect } from 'react';

type ThemeType = 'light' | 'dark' | 'system';

const themeArray: ThemeType[] = ['light', 'dark', 'system'];

const isValidTheme = (value: string | null): value is ThemeType => {
  return value !== null && themeArray.some((theme) => theme === value);
};

function ThemeSwitcher() {
  const themeClassListHandler = document.documentElement.classList;
  const themeHandles = {
    light: () => themeClassListHandler.remove('dark'),
    dark: () => themeClassListHandler.add('dark'),
    system: () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? themeClassListHandler.add('dark')
        : themeClassListHandler.remove('dark'),
  };

  const handleClick = (theme: ThemeType) => {
    themeHandles[theme]();
    localStorage.setItem('isDark', theme);
  };

  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem('isDark') || 'false');
    if (isValidTheme(currentTheme)) {
      themeHandles[currentTheme]();
      localStorage.setItem('isDark', currentTheme);
    } else {
      themeHandles.system();
    }
  }, []);

  return (
    <div className="flex justify-between">
      {themeArray.map((theme) => (
        <button key={theme} onClick={() => handleClick(theme)}>
          {theme}
        </button>
      ))}
    </div>
  );
}

export default ThemeSwitcher;
