'use client';

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Props = {
  children: ReactNode;
};

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: Props) {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
    localStorage.setItem('isDark', JSON.stringify(!isDark));
    document.documentElement.classList.toggle('dark');
  }, [isDark]);

  const values: ThemeContextType = useMemo(
    () => ({
      isDark,
      toggleTheme,
    }),
    [isDark, toggleTheme]
  );

  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem('isDark') || 'false');
    setIsDark(currentTheme);
    if (currentTheme) document.documentElement.classList.toggle('dark');
  }, []);

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
