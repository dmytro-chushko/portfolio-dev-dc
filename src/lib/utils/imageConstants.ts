export const IMAGE_SIZES = {
  PORTRAIT: {
    width: 400,
    height: 600,
    aspectRatio: '2/3' as const,
  },

  LANDSCAPE: {
    width: 1200,
    height: 800,
    aspectRatio: '3/2' as const,
  },

  SQUARE: {
    width: 500,
    height: 500,
    aspectRatio: '1/1' as const,
  },
} as const;

export const ABOUT_ME_IMAGE_TYPES = {
  HEADER: 'PORTRAIT' as const,
  FOOTER: 'LANDSCAPE' as const,
  HOBBIES: 'LANDSCAPE' as const,
} as const;

export const getImageSize = (type: keyof typeof ABOUT_ME_IMAGE_TYPES) => {
  const imageType = ABOUT_ME_IMAGE_TYPES[type];

  return IMAGE_SIZES[imageType];
};
