import Paragraph from '@/components/typography/Paragraph/Paragraph';
import StyledImage from '@/components/ui/StyledImage/StyledImage';

type AboutMeContentProps = {
  header: string;
  subHeader: string;
  footer: string;
  hobbies: string;
  headerImg: string;
  footerImg: string;
  hobbiesImgs: string[];
};

export const AboutMeContent = ({
  header,
  subHeader,
  // footer,
  // hobbies,
  headerImg,
  // footerImg,
  // hobbiesImgs,
}: AboutMeContentProps) => {
  return (
    <div className="h-full flex-grow md:flex md:items-center gap-6">
      <div>
        <Paragraph className="text-5xl font-bold mb-6">{header}</Paragraph>
        <Paragraph className="text-3xl">{subHeader}</Paragraph>
      </div>
      <StyledImage
        className="md:w-1/3"
        imgSrc={headerImg}
        altText="title Dmytro Chushko"
        width={2592}
        height={3888}
      />
    </div>
  );
};
