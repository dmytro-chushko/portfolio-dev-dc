# Component Rules

## Component Structure

```typescript
// 1. Imports (external, internal, types)
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { ComponentProps } from './types';

// 2. Types/Interfaces
interface ComponentProps {
  // props definition
}

// 3. Component
export function Component({ prop1, prop2 }: ComponentProps) {
  // hooks
  // handlers
  // render
}
```

## Naming Conventions

- **Components**: PascalCase (e.g., `HeroItem`, `CareerList`)
- **Files**: PascalCase for components, camelCase for utilities
- **Props interfaces**: `ComponentNameProps`
- **Types**: PascalCase with descriptive names
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase

## Component Categories

### UI Components (`src/components/ui/`)

- Reusable, generic components
- No business logic
- Highly configurable
- Examples: `Button`, `StyledInput`, `StyledTextarea`

### Feature Components (`src/components/features/`)

- Business logic components
- Specific to application features
- Examples: `HeroItem`, `CareerList`, `ProjectList`

### Layout Components (`src/components/layout/`)

- Layout and structure components
- Examples: `Header`, `SectionLayout`, `Hero`

### Typography Components (`src/components/typography/`)

- Text-related components
- Examples: `Title`, `Paragraph`

## Component Patterns

### Compound Components

```typescript
// ✅ Use compound components for complex UI
export function HeroItem({ hero }: HeroItemProps) {
  return (
    <div className="hero-item">
      <HeroItem.Header hero={hero} />
      <HeroItem.Content hero={hero} />
      <HeroItem.Actions hero={hero} />
    </div>
  );
}

HeroItem.Header = function HeroItemHeader({ hero }: { hero: Hero }) {
  return <div className="hero-header">{hero.heroVersion}</div>;
};

HeroItem.Content = function HeroItemContent({ hero }: { hero: Hero }) {
  return <div className="hero-content">{/* content */}</div>;
};

HeroItem.Actions = function HeroItemActions({ hero }: { hero: Hero }) {
  return <div className="hero-actions">{/* actions */}</div>;
};
```

### Props Interface

```typescript
// ✅ Follow the established pattern
interface ComponentProps {
  // Required props first
  id: string;
  title: string;

  // Optional props with default values
  isActive?: boolean;
  className?: string;

  // Event handlers
  onClick?: () => void;
  onChange?: (value: string) => void;

  // Children
  children?: React.ReactNode;
}
```

### State Management

```typescript
// ✅ Use proper state management
export function Component({ initialValue }: ComponentProps) {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  // Use useCallback for event handlers
  const handleClick = useCallback(() => {
    setValue(prev => prev + 1);
  }, []);

  // Use useMemo for expensive calculations
  const processedData = useMemo(() => {
    return expensiveCalculation(value);
  }, [value]);

  return (
    <div>
      <button onClick={handleClick}>
        Value: {value}
      </button>
    </div>
  );
}
```

## Styling Patterns

### CSS Modules

```typescript
// ✅ Use CSS modules for component-specific styles
import styles from './Component.module.css';

export function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
    </div>
  );
}
```

### Tailwind CSS

```typescript
// ✅ Use Tailwind utility classes
export function Component({ variant }: ComponentProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      Button
    </button>
  );
}
```

### CSS Variables

```typescript
// ✅ Use CSS variables for theming
export function Component() {
  return (
    <div
      className="bg-background text-foreground"
      style={{
        '--custom-color': 'var(--primary-color)',
      } as React.CSSProperties}
    >
      Content
    </div>
  );
}
```

## Event Handling

```typescript
// ✅ Use proper event handling
export function Component() {
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    // Handle submit
  }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Handle change
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
    </form>
  );
}
```

## Form Components

```typescript
// ✅ Use react-hook-form with Yup validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

export function FormComponent() {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    // Handle submit
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <StyledInput
        {...form.register('name')}
        error={form.formState.errors.name?.message}
      />
      <StyledInput
        {...form.register('email')}
        error={form.formState.errors.email?.message}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
```

## Loading States

```typescript
// ✅ Implement proper loading states
export function Component({ isLoading }: ComponentProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <div>Content</div>;
}
```

## Error Boundaries

```typescript
// ✅ Implement error boundaries
'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Accessibility

```typescript
// ✅ Implement proper accessibility
export function AccessibleComponent() {
  return (
    <button
      aria-label="Close dialog"
      aria-describedby="close-description"
      onClick={handleClose}
    >
      <span id="close-description" className="sr-only">
        Close the dialog
      </span>
      ×
    </button>
  );
}
```

## Performance Optimization

```typescript
// ✅ Use proper memoization
export const MemoizedComponent = memo(function Component({ data }: ComponentProps) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);

  const handleClick = useCallback(() => {
    // Handle click
  }, []);

  return (
    <div onClick={handleClick}>
      {processedData}
    </div>
  );
});
```

## Storybook Integration

```typescript
// ✅ Create stories for components
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
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
```

## Best Practices

- Follow the established component structure
- Use proper TypeScript types
- Implement proper error handling
- Use proper loading states
- Implement accessibility features
- Use proper memoization
- Follow the established naming conventions
- Use proper event handling
- Implement proper form validation
- Use proper styling patterns
- Create Storybook stories
- Use proper state management
- Implement proper error boundaries
- Use proper performance optimization
- Follow the established patterns in the codebase

