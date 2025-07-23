import LangSwitcher from '@/components/features/LangSwitcher/LangSwitcher';
import Socials from '@/components/features/Socials/Socials';
import ThemeSwitcher from '@/components/features/ThemeSwitcher/ThemeSwitcher';
import TopNavigation from '@/components/features/TopNavigation/TopNavigation';
import Header from '@/components/layout/Header/Header';
import { RootLayoutProps } from '@/lib/types/RootLayoutType';
import { getDictionary, langs } from '@/lib/utils/getDictionary';

type HomeRootLoyoutProps = Readonly<RootLayoutProps> & {
  hero: React.ReactNode;
  career: React.ReactNode;
};

export default async function RootLayout({
  hero,
  career,
  children,
  params,
}: HomeRootLoyoutProps) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header>
        <TopNavigation linkLabels={dict.nav.links} linkPrefix={`/${lang}/#`} />
        <ThemeSwitcher themes={dict.theme} />
        <LangSwitcher currentLang={lang} langs={langs} />
        <Socials />
      </Header>
      <main className="container mx-auto px-4">
        {hero}
        {career}
        {children}
      </main>
    </>
  );
}
