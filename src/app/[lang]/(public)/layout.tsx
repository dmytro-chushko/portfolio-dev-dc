import LangSwitcher from '@/components/features/LangSwitcher/LangSwitcher';
import Socials from '@/components/features/Socials/Socials';
import ThemeSwitcher from '@/components/features/ThemeSwitcher/ThemeSwitcher';
import TopNavigation from '@/components/features/TopNavigation/TopNavigation';
import Header from '@/components/layout/Header/Header';
import { LangType } from '@/lib/types/LangType';
import { getDictionary, langs } from '@/lib/utils/getDictionary';

export default async function RootLayout({
  hero,
  children,
  params,
}: Readonly<{
  hero: React.ReactNode;
  children: React.ReactNode;
  params: Promise<{ lang: LangType }>;
}>) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header>
        <TopNavigation linkLabels={dict.nav.links} />
        <ThemeSwitcher themes={dict.theme} />
        <LangSwitcher currentLang={lang} langs={langs} />
        <Socials />
      </Header>
      <main className="container mx-auto px-4">
        {hero}
        {children}
      </main>
    </>
  );
}
