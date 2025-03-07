'use client';
import { usePathname, useRouter } from 'next/navigation';

import { LangType } from '@/lib/types/LangType';

const LangSwitcher = ({
  currentLang,
  langs,
}: {
  currentLang: LangType;
  langs: string[];
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const newPath = `/${newLocale}${pathname.replace(/^\/[a-z]{2}/, '')}`;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`;
    router.push(newPath);
  };

  return (
    <nav>
      {langs.map((lang) => (
        <button
          key={lang}
          onClick={() => switchLanguage(lang)}
          disabled={currentLang === lang}
        >
          {lang}
        </button>
      ))}
    </nav>
  );
};

export default LangSwitcher;
