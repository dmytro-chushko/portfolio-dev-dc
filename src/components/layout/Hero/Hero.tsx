import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';

type HeroProps = {
  heroTitle: string;
  heroDescripton: string;
};

const Hero = ({ heroTitle, heroDescripton }: HeroProps) => {
  return (
    <div className="h-screen mx-auto flex items-center justify-center lg:h-[calc(100vh-88px)] lg:max-w-3xl">
      <div>
        <Title header="h1" copy={heroTitle} />
        <Paragraph accent>{heroDescripton}</Paragraph>
      </div>
    </div>
  );
};

export default Hero;
