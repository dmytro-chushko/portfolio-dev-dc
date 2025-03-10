'use client';
import clsx from 'clsx';
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
    <ul className="flex gap-1">
      {langs.map((lang) => (
        <li key={lang} className="">
          <button
            className={clsx(
              'uppercase rounded-full p-2 leading-tight disabled:bg-active',
              currentLang !== lang && 'md:hover:text-hovered'
            )}
            onClick={() => switchLanguage(lang)}
            aria-label={lang}
            disabled={currentLang === lang}
          >
            {lang}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default LangSwitcher;
