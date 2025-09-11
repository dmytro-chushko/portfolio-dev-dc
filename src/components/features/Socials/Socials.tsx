import clsx from 'clsx';

import DiscordIcon from '@/components/icons/socials/discord.svg';
import GitHubIcon from '@/components/icons/socials/github.svg';
import LinkedInIcon from '@/components/icons/socials/linkedin.svg';
import TelegramIcon from '@/components/icons/socials/telegram.svg';
import WhatsAppIcon from '@/components/icons/socials/whatsup.svg';

const SOCIAL_SIZE_MAP = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12',
  xxl: 'w-14 h-14',
} as const;

type IconSize = keyof typeof SOCIAL_SIZE_MAP;

const socialArray = [
  {
    icon: (size: IconSize) => (
      <GitHubIcon className={clsx('fill - current', SOCIAL_SIZE_MAP[size])} />
    ),
    label: 'git-hub',
    link: 'https://github.com/dmytro-chushko',
  },
  {
    icon: (size: IconSize) => (
      <LinkedInIcon className={clsx('fill - current', SOCIAL_SIZE_MAP[size])} />
    ),
    label: 'linkedin',
    link: 'https://www.linkedin.com/in/dmytro-chushko',
  },
  {
    icon: (size: IconSize) => (
      <TelegramIcon className={clsx('fill - current', SOCIAL_SIZE_MAP[size])} />
    ),
    label: 'telegram',
    link: 'https://t.me/dmytro_chushko',
  },
  {
    icon: (size: IconSize) => (
      <WhatsAppIcon className={clsx('fill - current', SOCIAL_SIZE_MAP[size])} />
    ),
    label: 'whatsapp',
    link: 'https://wa.me/380674097948',
  },
  {
    icon: (size: IconSize) => (
      <DiscordIcon className={clsx('fill - current', SOCIAL_SIZE_MAP[size])} />
    ),
    label: 'discord',
    link: 'https://discord.gg/6WzYkx9m',
  },
];

type SocialsProps = {
  size?: IconSize;
  mobileColumn?: boolean;
};

const Socials = ({ size = 'sm', mobileColumn = false }: SocialsProps) => {
  return (
    <ul
      className={clsx(
        'flex items-center justify-center gap-4',
        mobileColumn && 'max-sm:flex-col'
      )}
    >
      {socialArray.map(({ icon, label, link }) => (
        <li key={label}>
          <a
            className="text-foreground md:hover:text-hovered transition-colors"
            key={label}
            href={link}
            aria-label={label}
          >
            {icon(size)}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
