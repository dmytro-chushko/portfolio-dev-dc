import { LangType } from '@prisma/client';

import SectionLayout from '@/components/layout/SectionLayout/SectionLayout';
import { getDictionary } from '@/lib/utils/getDictionary';

type ProjectsSlotProps = {
  params: Promise<{ lang: LangType }>;
};

export default async function ProjectsSlot({ params }: ProjectsSlotProps) {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);

  return (
    <SectionLayout id="projects" title={dictionary.nav.links.projects}>
      Projects
    </SectionLayout>
  );
}
