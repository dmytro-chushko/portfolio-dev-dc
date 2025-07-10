'use client';

import { LangType } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect } from 'react';

import removeHeroAction from '@/app/actions/removeHeroAction';
import Button from '@/components/ui/Button/Button';
import showActionMessages from '@/lib/utils/showActionMessages';

type RemoveHeroProps = {
  heroId: string;
  isActive: boolean;
  lang: LangType;
};

const RemoveHero = ({ heroId, isActive, lang }: RemoveHeroProps) => {
  const t = useTranslations('dashboard.hero_item');

  const [state, formAction, pending] = useActionState(removeHeroAction, {
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

  return (
    <Button onClick={handleClick} loading={pending} disabled={isActive}>
      {t('removeHero')}
    </Button>
  );
};

export default RemoveHero;
