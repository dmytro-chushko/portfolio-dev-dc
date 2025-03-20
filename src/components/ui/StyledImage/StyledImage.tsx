import Image from 'next/image';

type StyledImageProps = {
  imgSrc: string;
  altText: string;
  width: number;
  height: number;
  className?: string;
};

const StyledImage = ({ imgSrc, width, height, altText }: StyledImageProps) => {
  return imgSrc ? (
    <Image src={imgSrc} width={width} height={height} alt={altText} />
  ) : (
    <div className="w-52 h-52 bg-foreground flex items-center justify-center">
      no-image
    </div>
  );
};

export default StyledImage;
