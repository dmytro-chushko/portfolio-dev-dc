'use client';

import { LangType } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect } from 'react';

import activateHeroAction from '@/app/actions/activateHeroAction';
import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Button from '@/components/ui/Button/Button';
import showActionMessages from '@/lib/utils/showActionMessages';

type ActivateHeroProps = {
  heroId: string;
  isActive: boolean;
  lang: LangType;
};

const ActivateHero = ({ heroId, isActive, lang }: ActivateHeroProps) => {
  const t = useTranslations('dashboard.hero_item');

  const [state, formAction, pending] = useActionState(activateHeroAction, {
    status: '',
    successMessage: '',
    lang,
  });

  const handleClick = () => {
    const formData = new FormData();

    formData.set('heroId', heroId);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state.status) return;

    const { successMessage, errorMessage } = state;

    showActionMessages({ successMessage, errorMessage });

    return () => {
      state.status = '';
    };
  }, [state]);

  return isActive ? (
    <Paragraph>{t('activationIndicator')}</Paragraph>
  ) : (
    <Button onClick={handleClick} loading={pending}>
      {t('activateHero')}
    </Button>
  );
};

export default ActivateHero;
