import Title from '@/components/typography/Title/Title';

import { AboutMeHeader } from './components/AboutMeHeader';

type AboutMeContentProps = {
  setionHeader: string;
  header: string;
  subHeader: string;
  footer: string;
  hobbies: string;
  headerImg: string;
  footerImg: string;
  hobbiesImgs: string[];
};

export const AboutMeContent = ({
  setionHeader,
  header,
  subHeader,
  // footer,
  // hobbies,
  headerImg,
  // footerImg,
  // hobbiesImgs,
}: AboutMeContentProps) => {
  return (
    <div className="min-h-screen py-[104px] flex flex-col">
      <Title className="section-title" header="h2" copy={setionHeader} />
      <div className="flex-grow">
        <AboutMeHeader
          headerTitle={header}
          headerSubtitle={subHeader}
          headerImg={headerImg}
        />
      </div>
    </div>
  );
};
