import Title from '@/components/typography/Title/Title';

import AboutMeFooter from './components/AboutMeFooter';
import { AboutMeHeader } from './components/AboutMeHeader';
import AboutMeHobbies from './components/AboutMeHobbies/AboutMeHobbies';

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
  footer,
  hobbies,
  headerImg,
  footerImg,
  hobbiesImgs,
}: AboutMeContentProps) => {
  return (
    <>
      <div className="min-h-screen py-[104px] flex flex-col">
        <Title className="section-title" header="h2" copy={setionHeader} />
        <div className="flex-grow container mx-auto px-4">
          <AboutMeHeader
            headerTitle={header}
            headerSubtitle={subHeader}
            headerImg={headerImg}
          />
        </div>
      </div>
      <AboutMeHobbies hobbies={hobbies} hobbiesImgs={hobbiesImgs} />
      <div className="container mx-auto px-4 min-h-screen md:flex md:items-center">
        <AboutMeFooter footerTitle={footer} footerImg={footerImg} />
      </div>
    </>
  );
};
