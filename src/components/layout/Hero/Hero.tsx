import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';
import Button from '@/components/ui/Button/Button';
import StyledImage from '@/components/ui/StyledImage/StyledImage';

type HeroProps = {
  heroTitle: string;
  heroDescripton: string;
  heroPhoto: string;
};

const Hero = ({ heroTitle, heroDescripton, heroPhoto }: HeroProps) => {
  return (
    <div className="h-screen mx-auto flex flex-col items-center justify-center md:flex-row lg:h-[calc(100vh-88px)] lg:max-w-4xl">
      <div className="order-2 grid gap-4 md:order-1">
        <Title header="h1" copy={heroTitle} />
        <Paragraph accent>{heroDescripton}</Paragraph>
        <div className="flex items-center gap-4">
          <Button variant="primary" loading>
            Primary Button
          </Button>
          <Button variant="secondary" loading>
            Secondary Button
          </Button>
        </div>
      </div>
      <div className=" order-1 rounded-full overflow-hidden flex-shrink-0 border-4 border-solid border-[--foreground] md:order-2">
        <StyledImage
          imgSrc={heroPhoto}
          height={408}
          width={408}
          altText={heroTitle}
        />
      </div>
    </div>
  );
};

export default Hero;
