# Dev DC Portfolio - Project Rules

## Project Overview

This is a Next.js 15 portfolio project with TypeScript, Prisma, Tailwind CSS, and internationalization (i18n) support.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl (en/ua)
- **UI Components**: Custom components with Storybook
- **Authentication**: Auth0
- **Storage**: Supabase
- **Code Quality**: ESLint + Prettier

## Code Style & Standards

### TypeScript

- Use strict TypeScript with proper type definitions
- Prefer interfaces over types for object shapes
- Use type guards for runtime type checking
- Always define return types for functions
- Use proper generic constraints
- Prefer `const assertions` for immutable data

### React/Next.js

- Use functional components with hooks
- Prefer Server Components over Client Components when possible
- Use proper Next.js patterns (Server Actions, App Router)
- Implement proper error boundaries
- Use proper loading states and error handling
- Follow Next.js file conventions (page.tsx, layout.tsx, etc.)

### File Structure

- Follow the established folder structure:
  - `src/app/` - Next.js App Router pages
  - `src/components/` - Reusable components
  - `src/lib/` - Utilities, types, services
  - `src/dictionaries/` - i18n translations
- Use index files for clean imports
- Group related files in folders
- Use descriptive file names

## Component Guidelines

### Component Structure

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

### Naming Conventions

- Components: PascalCase (e.g., `HeroItem`, `CareerList`)
- Files: PascalCase for components, camelCase for utilities
- Props interfaces: `ComponentNameProps`
- Types: PascalCase with descriptive names
- Constants: UPPER_SNAKE_CASE
- Functions: camelCase

### Component Patterns

- Use compound components for complex UI (e.g., `HeroItem` with sub-components)
- Implement proper prop validation
- Use proper TypeScript generics for reusable components
- Follow the established component structure in `/features` and `/ui`

## Database & Prisma

### Prisma Schema

- Use descriptive model names
- Implement proper relationships with foreign keys
- Use enums for fixed value sets (e.g., `LangType`)
- Add proper indexes for performance
- Use cascade deletes where appropriate

### Database Operations

- Always use Prisma client for database operations
- Implement proper error handling for database calls
- Use transactions for complex operations
- Validate data before database operations

## Internationalization (i18n)

### Translation Structure

- Use nested objects in translation files
- Keep translation keys descriptive and hierarchical
- Use the established pattern: `src/dictionaries/{lang}.json`
- Support both English (en) and Ukrainian (ua)

### Usage Patterns

```typescript
// In components
import { useTranslations } from 'next-intl';

const t = useTranslations('section.key');
return <h1>{t('title')}</h1>;
```

## Styling & UI

### Tailwind CSS

- Use Tailwind utility classes
- Create custom CSS only when necessary
- Use CSS variables for theme colors
- Follow the established color system in `tailwind.config.ts`
- Use responsive design patterns

### Component Styling

- Use CSS modules for component-specific styles
- Follow the established pattern in existing components
- Use proper class naming conventions
- Implement dark mode support

## API & Server Actions

### Server Actions

- Use proper validation with Yup schemas
- Implement proper error handling
- Use revalidation for cache updates
- Follow the pattern in `src/app/actions/`

### API Routes

- Use proper HTTP status codes
- Implement proper error responses
- Use TypeScript for request/response types
- Follow RESTful conventions

## Error Handling

### Error Types

- Use custom error classes from `src/lib/errors/`
- Implement proper error boundaries
- Use proper error messages for users
- Log errors appropriately

### Validation

- Use Yup for form validation
- Implement proper error messages
- Use type guards for runtime validation
- Validate data at API boundaries

## Performance & Optimization

### Next.js Optimizations

- Use proper image optimization
- Implement proper caching strategies
- Use dynamic imports for code splitting
- Optimize bundle size

### React Optimizations

- Use proper memoization (useMemo, useCallback)
- Implement proper key props for lists
- Avoid unnecessary re-renders
- Use proper dependency arrays

## Testing & Quality

### Code Quality

- Follow ESLint rules in `eslint.config.mjs`
- Use Prettier for code formatting
- Write meaningful commit messages
- Use proper TypeScript types

### Storybook

- Create stories for all UI components
- Use proper story structure
- Document component props
- Test different states and variants

## Security

### Authentication

- Use Auth0 for authentication
- Implement proper session management
- Protect sensitive routes
- Validate user permissions

### Data Security

- Validate all inputs
- Use proper SQL injection prevention (Prisma)
- Implement proper CORS policies
- Use environment variables for secrets

## Development Workflow

### Git & Commits

- Use conventional commit messages
- Create feature branches
- Use proper pull request reviews
- Keep commits atomic and focused

### Environment Setup

- Use proper environment variables
- Document setup requirements
- Use proper database migrations
- Follow the established development workflow

## Common Patterns

### Form Handling

```typescript
// Use react-hook-form with Yup validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  // validation schema
});

const form = useForm({
  resolver: yupResolver(schema),
});
```

### Data Fetching

```typescript
// Use proper error handling and loading states
const { data, error, isLoading } = useQuery({
  queryKey: ['key'],
  queryFn: fetchFunction,
});
```

### State Management

- Use React state for local component state
- Use URL state for shareable state
- Use proper state lifting patterns
- Avoid prop drilling

## File Organization

### Import Order

1. React and Next.js imports
2. Third-party libraries
3. Internal components and utilities
4. Types and interfaces
5. Relative imports

### Export Patterns

- Use named exports for components
- Use default exports sparingly
- Export types and interfaces
- Use barrel exports (index files) for clean imports

## Documentation

### Code Comments

- Write meaningful comments for complex logic
- Document public APIs
- Use JSDoc for functions
- Keep comments up to date

### README & Docs

- Keep README updated
- Document setup instructions
- Document API endpoints
- Document component usage

## Specific Project Rules

### Hero Management

- Follow the established pattern for hero variants
- Use proper translation handling
- Implement proper image upload handling
- Use proper activation/deactivation logic

### Career & Projects

- Use the established data structure
- Implement proper sorting and filtering
- Use proper image handling
- Follow the established UI patterns

### Skills & Technologies

- Use the established tech icon system
- Follow the TechIconKey type system
- Implement proper icon mapping
- Use consistent styling

Remember: Always prioritize code readability, maintainability, and performance. Follow the established patterns in the codebase and maintain consistency across all files.

