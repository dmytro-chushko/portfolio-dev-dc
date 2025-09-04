# Testing & Quality Rules

## Code Quality

- Follow ESLint rules in `eslint.config.mjs`
- Use Prettier for code formatting
- Write meaningful commit messages
- Use proper TypeScript types

## ESLint Configuration

```typescript
// ✅ Follow the established ESLint rules
const eslintConfig = [
  {
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    plugins: ['import'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'if' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];
```

## Prettier Configuration

```json
// ✅ Follow the established Prettier rules
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

## TypeScript Quality

```typescript
// ✅ Use strict TypeScript
const tsconfig = {
  compilerOptions: {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    // ... other options
  },
};
```

## Storybook Testing

### Component Stories

```typescript
// ✅ Create comprehensive stories for components
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'destructive'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};
```

### Interactive Stories

```typescript
// ✅ Create interactive stories for complex components
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { HeroItem } from './HeroItem';

const meta: Meta<typeof HeroItem> = {
  title: 'Features/HeroItem',
  component: HeroItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hero: {
      id: '1',
      heroVersion: 'v1.0',
      heroPhoto: '/hero-photo-placeholder.png',
      isActive: false,
      translations: [
        {
          id: '1',
          heroName: 'John Doe',
          heroDescription: 'Full-stack developer',
          language: { code: 'en', name: 'English' },
        },
      ],
    },
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
    hero: {
      ...Default.args.hero,
      isActive: true,
    },
  },
};

export const WithMultipleTranslations: Story = {
  args: {
    ...Default.args,
    hero: {
      ...Default.args.hero,
      translations: [
        {
          id: '1',
          heroName: 'John Doe',
          heroDescription: 'Full-stack developer',
          language: { code: 'en', name: 'English' },
        },
        {
          id: '2',
          heroName: 'Джон Доу',
          heroDescription: 'Фулл-стек розробник',
          language: { code: 'ua', name: 'Українська' },
        },
      ],
    },
  },
};

export const Interactive: Story = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test button interactions
    const activateButton = canvas.getByRole('button', { name: /activate/i });
    await userEvent.click(activateButton);

    // Test form interactions
    const nameInput = canvas.getByLabelText(/name/i);
    await userEvent.type(nameInput, 'New Name');

    // Test form submission
    const submitButton = canvas.getByRole('button', { name: /save/i });
    await userEvent.click(submitButton);
  },
};
```

## Unit Testing

### Component Testing

```typescript
// ✅ Test components with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
```

### Hook Testing

```typescript
// ✅ Test custom hooks
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });
});
```

### Utility Function Testing

```typescript
// ✅ Test utility functions
import { formatDate, calculateAge } from './utils';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2023-01-01');
    expect(formatDate(date)).toBe('01/01/2023');
  });

  it('handles invalid date', () => {
    expect(formatDate(null)).toBe('Invalid Date');
  });
});

describe('calculateAge', () => {
  it('calculates age correctly', () => {
    const birthDate = new Date('1990-01-01');
    const currentDate = new Date('2023-01-01');
    expect(calculateAge(birthDate, currentDate)).toBe(33);
  });
});
```

## Integration Testing

### API Testing

```typescript
// ✅ Test API endpoints
import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/heroes';

describe('/api/heroes', () => {
  it('returns heroes on GET', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty('data');
  });

  it('creates hero on POST', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        heroVersion: 'v1.0',
        heroPhoto: 'https://example.com/photo.jpg',
        translations: [
          {
            languageId: '1',
            heroName: 'John Doe',
            heroDescription: 'Full-stack developer',
          },
        ],
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toHaveProperty('data');
  });
});
```

### Database Testing

```typescript
// ✅ Test database operations
import { prisma } from '@/lib/clients/prismaClient';
import { createHero, getHeroes } from '@/lib/services/dbServices/heroService';

describe('Hero Service', () => {
  beforeEach(async () => {
    // Clean up database
    await prisma.hero.deleteMany();
  });

  afterAll(async () => {
    // Clean up database
    await prisma.hero.deleteMany();
    await prisma.$disconnect();
  });

  it('creates hero successfully', async () => {
    const heroData = {
      heroVersion: 'v1.0',
      heroPhoto: 'https://example.com/photo.jpg',
      translations: [
        {
          languageId: '1',
          heroName: 'John Doe',
          heroDescription: 'Full-stack developer',
        },
      ],
    };

    const hero = await createHero(heroData);

    expect(hero).toHaveProperty('id');
    expect(hero.heroVersion).toBe('v1.0');
    expect(hero.translations).toHaveLength(1);
  });

  it('fetches heroes successfully', async () => {
    // Create test data
    await createHero({
      heroVersion: 'v1.0',
      heroPhoto: 'https://example.com/photo.jpg',
      translations: [
        {
          languageId: '1',
          heroName: 'John Doe',
          heroDescription: 'Full-stack developer',
        },
      ],
    });

    const heroes = await getHeroes();

    expect(heroes).toHaveLength(1);
    expect(heroes[0].heroVersion).toBe('v1.0');
  });
});
```

## Performance Testing

### Component Performance

```typescript
// ✅ Test component performance
import { render } from '@testing-library/react';
import { HeroList } from './HeroList';

describe('HeroList Performance', () => {
  it('renders large list efficiently', () => {
    const largeHeroList = Array.from({ length: 1000 }, (_, i) => ({
      id: i.toString(),
      heroVersion: `v${i}`,
      heroPhoto: 'https://example.com/photo.jpg',
      isActive: i % 2 === 0,
      translations: [
        {
          id: i.toString(),
          heroName: `Hero ${i}`,
          heroDescription: `Description ${i}`,
          language: { code: 'en', name: 'English' },
        },
      ],
    }));

    const startTime = performance.now();
    render(<HeroList heroes={largeHeroList} />);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100); // Should render in less than 100ms
  });
});
```

## Accessibility Testing

### A11y Testing

```typescript
// ✅ Test accessibility
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper ARIA attributes', () => {
    render(<Button aria-label="Close dialog">×</Button>);
    expect(screen.getByLabelText(/close dialog/i)).toBeInTheDocument();
  });

  it('is keyboard accessible', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();

    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Best Practices

- Follow ESLint rules consistently
- Use Prettier for code formatting
- Write meaningful commit messages
- Use proper TypeScript types
- Create comprehensive Storybook stories
- Test components with React Testing Library
- Test custom hooks
- Test utility functions
- Test API endpoints
- Test database operations
- Test component performance
- Test accessibility
- Use proper test organization
- Write descriptive test names
- Use proper assertions
- Mock external dependencies
- Clean up test data
- Use proper test setup and teardown
- Follow the established testing patterns
- Use proper error handling in tests
- Test edge cases
- Use proper test data
- Follow the established quality standards

