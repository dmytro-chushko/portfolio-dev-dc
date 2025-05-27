import Image from 'next/image';

type StyledImageProps = {
  imgSrc: string;
  altText: string;
  width: number;
  height?: number;
  priority?: boolean;
  className?: string;
};

const StyledImage = ({
  imgSrc,
  width,
  height,
  altText,
  priority,
  className,
}: StyledImageProps) => {
  return imgSrc ? (
    <Image
      className={className}
      src={imgSrc}
      width={width}
      height={height}
      alt={altText}
      priority={!!priority}
      style={{ height: 'auto' }}
    />
  ) : (
    <div className="w-52 h-52 bg-foreground flex items-center justify-center">
      no-image
    </div>
  );
};

export default StyledImage;
