import { LangType } from './LangType';

export type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: LangType }>;
};
