'use client';
import { usePathname, useRouter } from 'next/navigation';

import revalidateLang from '@/app/actions/revalidateLang';
import LangSwitchItem from '@/components/ui/LangSwitcherItem/LangSwitchItem';
import { LangType } from '@/lib/types/LangType';

const LangSwitcher = ({
  currentLang,
  langs,
}: {
  currentLang: LangType;
  langs: LangType[];
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = async (newLocale: LangType) => {
    const newPath = `/${newLocale}${pathname.replace(/^\/[a-z]{2}/, '')}`;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`;
    await revalidateLang();
    router.replace(newPath, { scroll: false });
  };

  return (
    <ul className="flex gap-1">
      {langs.map((lang) => (
        <li key={lang} className="">
          <LangSwitchItem
            lang={lang}
            isCurrent={currentLang === lang}
            onSelect={switchLanguage}
          />
        </li>
      ))}
    </ul>
  );
};

export default LangSwitcher;
