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
  skills: React.ReactNode;
  projects: React.ReactNode;
  about_me: React.ReactNode;
  modal: React.ReactNode;
};

export default async function RootLayout({
  hero,
  career,
  skills,
  children,
  projects,
  about_me,
  modal,
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
      <main>
        {children}
        {hero}
        {career}
        {skills}
        {projects}
        {about_me}
        {modal}
      </main>
    </>
  );
}
