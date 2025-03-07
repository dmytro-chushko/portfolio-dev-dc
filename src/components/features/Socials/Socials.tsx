import DiscordIcon from '@/components/icons/socials/discord.svg';
import GitHubIcon from '@/components/icons/socials/github.svg';
import LinkedInIcon from '@/components/icons/socials/linkedin.svg';
import TelegramIcon from '@/components/icons/socials/telegram.svg';
import WhatsAppIcon from '@/components/icons/socials/whatsup.svg';

const socialArray = [
  {
    icon: <GitHubIcon className="fill-current w-6 h-6" />,
    label: 'git-hub',
    link: 'https://github.com/dmytro-chushko',
  },
  {
    icon: <LinkedInIcon className="fill-current w-6 h-6" />,
    label: 'linkedin',
    link: 'https://www.linkedin.com/in/dmytro-chushko',
  },
  {
    icon: <TelegramIcon className="fill-current w-6 h-6" />,
    label: 'telegram',
    link: 'https://t.me/dmytro_chushko',
  },
  {
    icon: <WhatsAppIcon className="fill-current w-6 h-6" />,
    label: 'whatsapp',
    link: 'https://wa.me/380674097948',
  },
  {
    icon: <DiscordIcon className="fill-current w-6 h-6" />,
    label: 'discord',
    link: 'https://discord.gg/6WzYkx9m',
  },
];

// type SocialsProps = {};

const Socials = () => {
  return (
    <ul className="flex items-center gap-4">
      {socialArray.map(({ icon, label, link }) => (
        <li key={label}>
          <a
            className="text-foreground md:hover:text-hovered transition-colors"
            key={label}
            href={link}
            aria-label={label}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
