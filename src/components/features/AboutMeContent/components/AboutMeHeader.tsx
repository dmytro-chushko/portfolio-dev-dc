import Paragraph from '@/components/typography/Paragraph/Paragraph';
import StyledImage from '@/components/ui/StyledImage/StyledImage';

type AboutMeHeaderProps = {
  headerTitle: string;
  headerSubtitle: string;
  headerImg: string;
};

export const AboutMeHeader = ({
  headerTitle,
  headerSubtitle,
  headerImg,
}: AboutMeHeaderProps) => {
  return (
    <div className="h-full flex-grow md:flex md:items-center gap-6">
      <div>
        <Paragraph className="text-5xl font-bold mb-6">{headerTitle}</Paragraph>
        <Paragraph className="text-3xl">{headerSubtitle}</Paragraph>
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
