import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';
import StyledImage from '@/components/ui/StyledImage/StyledImage';

type HeroProps = {
  heroTitle: string;
  heroDescripton: string;
};

const Hero = ({ heroTitle, heroDescripton }: HeroProps) => {
  return (
    <div className="h-screen mx-auto flex flex-col items-center justify-center md:flex-row lg:h-[calc(100vh-88px)] lg:max-w-4xl">
      <div className="order-2 md:order-1">
        <Title className="mb-4" header="h1" copy={heroTitle} />
        <Paragraph accent>{heroDescripton}</Paragraph>
      </div>
      <div className=" order-1 rounded-full overflow-hidden flex-shrink-0 border-4 border-solid border-[--foreground] md:order-2">
        <StyledImage
          imgSrc="/image/my_photo.jpg"
          height={408}
          width={408}
          altText={heroTitle}
        />
      </div>
    </div>
  );
};

export default Hero;
