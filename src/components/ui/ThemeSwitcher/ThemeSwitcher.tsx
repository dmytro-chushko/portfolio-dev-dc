'use client';
import { useTheme } from '@/providers/ThemeProvider';
import React from 'react';

function ThemeSwitcher() {
  const { toggleTheme } = useTheme();

  const handleClick = () => toggleTheme();

  return (
    <div
      className="bg-foreground w-5 h-5 rounded-sm cursor-pointer"
      onClick={handleClick}
    />
  );
}

export default ThemeSwitcher;
