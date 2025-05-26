import Image from 'next/image';

type StyledImageProps = {
  imgSrc: string;
  altText: string;
  width: number;
  height?: number;
  priority?: boolean;
};

const StyledImage = ({
  imgSrc,
  width,
  height,
  altText,
  priority,
}: StyledImageProps) => {
  return imgSrc ? (
    <Image
      src={imgSrc}
      width={width}
      height={height}
      alt={altText}
      priority={!!priority}
      style={{ width: 'auto', height: 'auto' }}
    />
  ) : (
    <div className="w-52 h-52 bg-foreground flex items-center justify-center">
      no-image
    </div>
  );
};

export default StyledImage;
