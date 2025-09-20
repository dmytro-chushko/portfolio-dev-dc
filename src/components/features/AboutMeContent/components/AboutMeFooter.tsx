import Title from '@/components/typography/Title/Title';
import StyledImage from '@/components/ui/StyledImage/StyledImage';

type AboutMeFooterProps = {
  footerTitle: string;
  footerImg: string;
};

export default async function AboutMeFooter({
  footerTitle,
  footerImg,
}: AboutMeFooterProps) {
  return (
    <div className="h-full flex-grow flex max-md:flex-col max-md:gap-16 items-center gap-6 justify-around">
      <Title header="h3" copy={footerTitle} />
      <StyledImage
        className="md:w-1/2"
        imgSrc={footerImg}
        altText="title Dmytro Chushko"
        aboutMeType="FOOTER"
      />
    </div>
  );
}
