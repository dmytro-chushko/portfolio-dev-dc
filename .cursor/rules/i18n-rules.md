# Internationalization (i18n) Rules

## Translation Structure

- Use nested objects in translation files
- Keep translation keys descriptive and hierarchical
- Use the established pattern: `src/dictionaries/{lang}.json`
- Support both English (en) and Ukrainian (ua)

## Translation Files Structure

```json
// ✅ src/dictionaries/en.json
{
  "hero": {
    "title": "Hero Section",
    "description": "Welcome to my portfolio",
    "actions": {
      "activate": "Activate",
      "deactivate": "Deactivate",
      "edit": "Edit",
      "delete": "Delete"
    }
  },
  "career": {
    "title": "Career",
    "experience": "Experience",
    "company": "Company",
    "position": "Position"
  },
  "projects": {
    "title": "Projects",
    "description": "My recent projects",
    "technologies": "Technologies used"
  }
}
```

```json
// ✅ src/dictionaries/ua.json
{
  "hero": {
    "title": "Секція Героя",
    "description": "Ласкаво просимо до мого портфоліо",
    "actions": {
      "activate": "Активувати",
      "deactivate": "Деактивувати",
      "edit": "Редагувати",
      "delete": "Видалити"
    }
  },
  "career": {
    "title": "Кар'єра",
    "experience": "Досвід",
    "company": "Компанія",
    "position": "Позиція"
  },
  "projects": {
    "title": "Проекти",
    "description": "Мої останні проекти",
    "technologies": "Використані технології"
  }
}
```

## Usage Patterns

### Client Components

```typescript
// ✅ Use useTranslations hook in client components
'use client';

import { useTranslations } from 'next-intl';

export function ClientComponent() {
  const t = useTranslations('hero');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('actions.activate')}</button>
    </div>
  );
}
```

### Server Components

```typescript
// ✅ Use getTranslations in server components
import { getTranslations } from 'next-intl/server';

export default async function ServerComponent() {
  const t = await getTranslations('hero');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### Nested Translations

```typescript
// ✅ Use nested translation keys
export function NestedComponent() {
  const t = useTranslations('hero.actions');

  return (
    <div>
      <button>{t('activate')}</button>
      <button>{t('deactivate')}</button>
      <button>{t('edit')}</button>
      <button>{t('delete')}</button>
    </div>
  );
}
```

## Language Switching

```typescript
// ✅ Implement language switching
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div>
      <button
        onClick={() => handleLanguageChange('en')}
        className={locale === 'en' ? 'active' : ''}
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange('ua')}
        className={locale === 'ua' ? 'active' : ''}
      >
        Українська
      </button>
    </div>
  );
}
```

## Form Validation Messages

```typescript
// ✅ Use translations for form validation
import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export function useValidationSchema() {
  const t = useTranslations('validation');

  return yup.object({
    name: yup.string().required(t('name.required')).min(2, t('name.minLength')),
    email: yup.string().email(t('email.invalid')).required(t('email.required')),
  });
}
```

## Dynamic Content

```typescript
// ✅ Use translations with dynamic content
export function DynamicComponent({ count }: { count: number }) {
  const t = useTranslations('messages');

  return (
    <div>
      <p>{t('itemCount', { count })}</p>
      <p>{t('lastUpdated', { date: new Date().toLocaleDateString() })}</p>
    </div>
  );
}
```

## Pluralization

```typescript
// ✅ Handle pluralization
export function PluralComponent({ count }: { count: number }) {
  const t = useTranslations('messages');

  return (
    <div>
      <p>{t('itemCount', { count })}</p>
      {/* Translation file should handle pluralization */}
    </div>
  );
}
```

## Date and Number Formatting

```typescript
// ✅ Use proper date and number formatting
import { useFormatter } from 'next-intl';

export function FormattedComponent() {
  const format = useFormatter();
  const date = new Date();
  const number = 1234.56;

  return (
    <div>
      <p>{format.dateTime(date, 'short')}</p>
      <p>{format.number(number, { style: 'currency', currency: 'USD' })}</p>
    </div>
  );
}
```

## Error Messages

```typescript
// ✅ Use translations for error messages
export function ErrorComponent({ error }: { error: string }) {
  const t = useTranslations('errors');

  return (
    <div className="error">
      <p>{t(error)}</p>
    </div>
  );
}
```

## Loading States

```typescript
// ✅ Use translations for loading states
export function LoadingComponent() {
  const t = useTranslations('loading');

  return (
    <div className="loading">
      <p>{t('message')}</p>
    </div>
  );
}
```

## Success Messages

```typescript
// ✅ Use translations for success messages
export function SuccessComponent({ message }: { message: string }) {
  const t = useTranslations('success');

  return (
    <div className="success">
      <p>{t(message)}</p>
    </div>
  );
}
```

## Navigation

```typescript
// ✅ Use translations for navigation
export function Navigation() {
  const t = useTranslations('navigation');

  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/about">{t('about')}</a>
      <a href="/projects">{t('projects')}</a>
      <a href="/contact">{t('contact')}</a>
    </nav>
  );
}
```

## Meta Tags

```typescript
// ✅ Use translations for meta tags
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}
```

## Language Detection

```typescript
// ✅ Implement language detection
import { getLocale } from 'next-intl/server';

export async function getServerSideProps() {
  const locale = await getLocale();

  return {
    props: {
      locale,
    },
  };
}
```

## Fallback Handling

```typescript
// ✅ Handle missing translations gracefully
export function SafeTranslationComponent() {
  const t = useTranslations('section');

  return (
    <div>
      <h1>{t('title') || 'Default Title'}</h1>
      <p>{t('description') || 'Default Description'}</p>
    </div>
  );
}
```

## Translation Keys Naming

```typescript
// ✅ Use descriptive and hierarchical translation keys
const translationKeys = {
  // ✅ Good: descriptive and hierarchical
  'hero.title': 'Hero Section',
  'hero.description': 'Welcome message',
  'hero.actions.activate': 'Activate hero',
  'hero.actions.deactivate': 'Deactivate hero',

  // ❌ Bad: unclear and flat
  title: 'Hero Section',
  desc: 'Welcome message',
  btn1: 'Activate hero',
  btn2: 'Deactivate hero',
};
```

## Best Practices

- Use nested objects for translation structure
- Keep translation keys descriptive and hierarchical
- Support both English and Ukrainian
- Use proper pluralization
- Handle missing translations gracefully
- Use translations for all user-facing text
- Implement proper language switching
- Use proper date and number formatting
- Use translations for form validation
- Use translations for error messages
- Use translations for loading states
- Use translations for success messages
- Use translations for navigation
- Use translations for meta tags
- Follow the established patterns in the codebase
- Keep translations consistent across languages
- Use proper translation key naming conventions

