import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';

import AboutMeFooter from './components/AboutMeFooter';

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
  // headerImg,
  footerImg,
  // hobbiesImgs,
}: AboutMeContentProps) => {
  return (
    <>
      <div className="py-[104px] flex flex-col">
        <Title className="section-title" header="h2" copy={setionHeader} />
        <div className="flex-grow container mx-auto px-4 space-y-7 ">
          {/* <AboutMeHeader
            headerTitle={header}
            headerSubtitle={subHeader}
            headerImg={headerImg}
          /> */}
          <div className="lg:w-1/2">
            <Paragraph className="text-5xl font-bold mb-6">{header}</Paragraph>
            <Paragraph className="text-3xl">{subHeader}</Paragraph>
          </div>
          <div className="lg:w-1/2 lg:ml-auto">
            <Paragraph className="text-3xl">{hobbies}</Paragraph>
          </div>
        </div>
      </div>
      {/* <AboutMeHobbies hobbies={hobbies} hobbiesImgs={hobbiesImgs} /> */}
      <div className="container mx-auto px-4 min-h-screen flex items-center">
        <AboutMeFooter footerTitle={footer} footerImg={footerImg} />
      </div>
    </>
  );
};
