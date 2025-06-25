'use client';

import { LangType } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect } from 'react';

import createHeroVariantAction from '@/app/actions/createHeroVariantAction';
import Button from '@/components/ui/Button/Button';
import CONST from '@/lib/utils/consts';
import showActionMessages from '@/lib/utils/showActionMessages';

const AddHeroVersion = () => {
  const { lang } = useParams<{ lang: LangType }>();
  const t = useTranslations();
  const [state, formAction, pending] = useActionState(createHeroVariantAction, {
    status: '',
    successMessage: '',
    lang,
  });

  const handleClick = () => {
    const formData = new FormData();

    formData.set('heroPhoto', CONST.MOCK_HERO.HERO_PHOTO);
    formData.set('heroVersion', Date.now().toString());
    formData.set('translations', JSON.stringify(CONST.MOCK_HERO.TRANSLATIONS));

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state.status) return;

    const { successMessage, errorMessage } = state;

    showActionMessages({ successMessage, errorMessage });
  }, [state]);

  return (
    <div>
      <Button loading={pending} onClick={handleClick}>
        {t('dashboard.hero.add_hero')}
      </Button>
    </div>
  );
};

export default AddHeroVersion;
