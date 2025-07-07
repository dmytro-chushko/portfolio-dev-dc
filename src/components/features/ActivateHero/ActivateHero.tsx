import { useTranslations } from 'next-intl';

import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Button from '@/components/ui/Button/Button';

type ActivateHeroProps = {
  isActive: boolean;
};

const ActivateHero = ({ isActive }: ActivateHeroProps) => {
  const t = useTranslations('dashboard.hero_item');

  return isActive ? (
    <Button>{t('activateHero')}</Button>
  ) : (
    <Paragraph>{t('activationIndicator')}</Paragraph>
  );
};

export default ActivateHero;
