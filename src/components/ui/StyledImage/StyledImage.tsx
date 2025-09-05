'use client';

import Image from 'next/image';
import { useState } from 'react';

import { getImageSize, IMAGE_SIZES } from '@/lib/utils/imageConstants';
import {
  getFallbackImage,
  getHobbyFallbackImage,
} from '@/lib/utils/imageFallback';

type StyledImageProps = {
  imgSrc: string;
  altText: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  imageType?: keyof typeof IMAGE_SIZES;
  aboutMeType?: 'HEADER' | 'FOOTER' | 'HOBBIES';
  hobbyIndex?: number;
};

const StyledImage = ({
  imgSrc,
  width,
  height,
  altText,
  priority,
  className,
  imageType,
  aboutMeType,
  hobbyIndex,
}: StyledImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(imgSrc);

  let finalWidth = width;
  let finalHeight = height;
  let aspectRatio = 'auto';

  if (aboutMeType) {
    const size = getImageSize(aboutMeType) as {
      width: number;
      height: number;
      aspectRatio: string;
    };
    finalWidth = size.width;
    finalHeight = size.height;
    aspectRatio = size.aspectRatio;
  } else if (imageType) {
    const size = IMAGE_SIZES[imageType];
    finalWidth = size.width;
    finalHeight = size.height;
    aspectRatio = size.aspectRatio;
  }

  const handleImageError = () => {
    if (!imageError && aboutMeType) {
      setImageError(true);

      if (aboutMeType === 'HOBBIES' && hobbyIndex !== undefined) {
        setCurrentSrc(getHobbyFallbackImage(hobbyIndex));
      } else if (aboutMeType === 'HEADER' || aboutMeType === 'FOOTER') {
        setCurrentSrc(getFallbackImage(aboutMeType));
      }
    }
  };

  let imageSource = currentSrc;

  if (!currentSrc && aboutMeType) {
    if (aboutMeType === 'HOBBIES' && hobbyIndex !== undefined) {
      imageSource = getHobbyFallbackImage(hobbyIndex);
    } else if (aboutMeType === 'HEADER' || aboutMeType === 'FOOTER') {
      imageSource = getFallbackImage(aboutMeType);
    }
  }

  return imageSource ? (
    <Image
      className={className}
      src={imageSource}
      width={finalWidth}
      height={finalHeight}
      alt={altText}
      priority={!!priority}
      onError={handleImageError}
      style={{
        height: 'auto',
        aspectRatio: aspectRatio,
        objectFit: 'cover',
      }}
    />
  ) : (
    <div
      className="bg-foreground flex items-center justify-center"
      style={{
        width: finalWidth || 208,
        height: finalHeight || 208,
        aspectRatio: aspectRatio,
      }}
    >
      no-image
    </div>
  );
};

export default StyledImage;
