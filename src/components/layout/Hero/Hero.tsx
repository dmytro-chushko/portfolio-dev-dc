import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';

type HeroProps = {
  heroTitle: string;
  heroDescripton: string;
};

const Hero = ({ heroTitle, heroDescripton }: HeroProps) => {
  return (
    <div>
      <Title header="h1" copy={heroTitle} />
      <Paragraph>{heroDescripton}</Paragraph>
    </div>
  );
};

export default Hero;
