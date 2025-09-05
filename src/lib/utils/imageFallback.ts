export const FALLBACK_IMAGES = {
  HEADER: '/image/about-me/header.svg',
  FOOTER: '/image/about-me/footer.svg',
  HOBBIES: {
    GUITAR: '/image/about-me/hobbie_guitar.svg',
    SKI_SINGLE: '/image/about-me/ski_single.svg',
    SKI_CREW: '/image/about-me/hobbie_ski_crew.svg',
  },
} as const;

export const SUPABASE_IMAGES = {
  HEADER:
    'https://jrvahgupsifnchwwzflu.supabase.co/storage/v1/object/public/dev-dc-portfolio-bucket/about-me/header.jpg',
  FOOTER:
    'https://jrvahgupsifnchwwzflu.supabase.co/storage/v1/object/public/dev-dc-portfolio-bucket/about-me/footer.png',
  HOBBIES: {
    GUITAR:
      'https://jrvahgupsifnchwwzflu.supabase.co/storage/v1/object/public/dev-dc-portfolio-bucket/about-me/hobbie_guitar.jpg',
    SKI_SINGLE:
      'https://jrvahgupsifnchwwzflu.supabase.co/storage/v1/object/public/dev-dc-portfolio-bucket/about-me/ski_single.jpg',
    SKI_CREW:
      'https://jrvahgupsifnchwwzflu.supabase.co/storage/v1/object/public/dev-dc-portfolio-bucket/about-me/hobbie_ski_crew.jpg',
  },
} as const;

export const checkImageAvailability = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });

    return response.ok;
  } catch {
    return false;
  }
};

export const getFallbackImage = (type: 'HEADER' | 'FOOTER'): string => {
  return FALLBACK_IMAGES[type];
};

export const getHobbyFallbackImage = (index: number): string => {
  const hobbyImages = Object.values(FALLBACK_IMAGES.HOBBIES);

  return hobbyImages[index % hobbyImages.length];
};

export const getImageWithFallback = async (
  supabaseUrl: string,
  fallbackUrl: string
): Promise<string> => {
  try {
    const isAvailable = await checkImageAvailability(supabaseUrl);

    return isAvailable ? supabaseUrl : fallbackUrl;
  } catch {
    return fallbackUrl;
  }
};

export const getAboutMeImage = async (
  type: 'HEADER' | 'FOOTER' | 'HOBBIES',
  hobbyIndex?: number
): Promise<string> => {
  if (type === 'HOBBIES' && hobbyIndex !== undefined) {
    const hobbyKeys = Object.keys(SUPABASE_IMAGES.HOBBIES) as Array<
      keyof typeof SUPABASE_IMAGES.HOBBIES
    >;
    const key = hobbyKeys[hobbyIndex % hobbyKeys.length];
    const supabaseUrl = SUPABASE_IMAGES.HOBBIES[key];
    const fallbackUrl = getHobbyFallbackImage(hobbyIndex);

    return getImageWithFallback(supabaseUrl, fallbackUrl);
  } else if (type === 'HEADER' || type === 'FOOTER') {
    const supabaseUrl = SUPABASE_IMAGES[type];
    const fallbackUrl = getFallbackImage(type);

    return getImageWithFallback(supabaseUrl, fallbackUrl);
  }

  return '';
};
