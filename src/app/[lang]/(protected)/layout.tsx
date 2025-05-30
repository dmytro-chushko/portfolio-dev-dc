import LangSwitcher from '@/components/features/LangSwitcher/LangSwitcher';
import ThemeSwitcher from '@/components/features/ThemeSwitcher/ThemeSwitcher';
import TopNavigation from '@/components/features/TopNavigation/TopNavigation';
import Header from '@/components/layout/Header/Header';
import { RootLayoutProps } from '@/lib/types/RootLayoutType';
import { getDictionary, langs } from '@/lib/utils/getDictionary';

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header>
        <TopNavigation
          linkLabels={dict.nav.dashboard}
          linkPrefix="/dc-dashboard/"
        />
        <ThemeSwitcher themes={dict.theme} />
        <LangSwitcher currentLang={lang} langs={langs} />
      </Header>
      <main className="container mx-auto px-4">{children}</main>
    </>
  );
}
