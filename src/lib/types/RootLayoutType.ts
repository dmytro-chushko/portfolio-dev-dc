/**
 * Use string to satisfy Next.js LayoutProps<"/[lang]"> (dynamic segment is inferred as string).
 * Narrow to LangType inside layouts when calling getDictionary etc.
 */
export type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};
