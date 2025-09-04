# Styling & UI Rules

## Tailwind CSS

- Use Tailwind utility classes
- Create custom CSS only when necessary
- Use CSS variables for theme colors
- Follow the established color system
- Use responsive design patterns

## Color System

```typescript
// ✅ Use the established color system from tailwind.config.ts
const colors = {
  background: 'rgba(var(--background), <alpha-value>)',
  foreground: 'rgba(var(--foreground), <alpha-value>)',
  bgInput: 'var(--bg-input)',
  hovered: 'var(--hovered)',
  active: 'var(--active)',
  error: 'var(--error)',
};
```

## Component Styling Patterns

### CSS Modules

```typescript
// ✅ Use CSS modules for component-specific styles
import styles from './Component.module.css';

export function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
      <p className={styles.description}>Description</p>
    </div>
  );
}
```

### Tailwind Utility Classes

```typescript
// ✅ Use Tailwind utility classes
export function Button({ variant, size, children }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
  };

  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
}
```

### CSS Variables

```typescript
// ✅ Use CSS variables for theming
export function ThemedComponent() {
  return (
    <div
      className="bg-background text-foreground"
      style={{
        '--custom-primary': 'var(--primary)',
        '--custom-secondary': 'var(--secondary)',
      } as React.CSSProperties}
    >
      Content
    </div>
  );
}
```

## Responsive Design

```typescript
// ✅ Use responsive design patterns
export function ResponsiveComponent() {
  return (
    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-4
      p-4
      sm:p-6
      lg:p-8
    ">
      <div className="
        bg-white
        dark:bg-gray-800
        rounded-lg
        shadow-md
        p-4
        hover:shadow-lg
        transition-shadow
      ">
        Content
      </div>
    </div>
  );
}
```

## Dark Mode Support

```typescript
// ✅ Implement dark mode support
export function DarkModeComponent() {
  return (
    <div className="
      bg-white
      dark:bg-gray-900
      text-gray-900
      dark:text-gray-100
      border
      border-gray-200
      dark:border-gray-700
      rounded-lg
      p-4
    ">
      <h2 className="
        text-xl
        font-semibold
        text-gray-800
        dark:text-gray-200
        mb-2
      ">
        Title
      </h2>
      <p className="
        text-gray-600
        dark:text-gray-400
      ">
        Description
      </p>
    </div>
  );
}
```

## Animation & Transitions

```typescript
// ✅ Use proper animations and transitions
export function AnimatedComponent() {
  return (
    <div className="
      transform
      transition-all
      duration-300
      ease-in-out
      hover:scale-105
      hover:shadow-lg
    ">
      <div className="
        animate-pulse
        bg-gray-200
        dark:bg-gray-700
        rounded
        h-4
        w-full
      " />
    </div>
  );
}
```

## Form Styling

```typescript
// ✅ Style forms consistently
export function StyledForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="
          block
          text-sm
          font-medium
          text-gray-700
          dark:text-gray-300
          mb-1
        ">
          Label
        </label>
        <input
          className="
            w-full
            px-3
            py-2
            border
            border-gray-300
            dark:border-gray-600
            rounded-md
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            dark:bg-gray-700
            dark:text-white
          "
          type="text"
        />
      </div>

      <button
        type="submit"
        className="
          w-full
          bg-blue-600
          text-white
          py-2
          px-4
          rounded-md
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
          transition-colors
        "
      >
        Submit
      </button>
    </form>
  );
}
```

## Layout Patterns

```typescript
// ✅ Use consistent layout patterns
export function LayoutComponent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="
        bg-white
        dark:bg-gray-800
        shadow-sm
        border-b
        border-gray-200
        dark:border-gray-700
      ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Header content */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Main content */}
        </div>
      </main>

      <footer className="
        bg-white
        dark:bg-gray-800
        border-t
        border-gray-200
        dark:border-gray-700
      ">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          {/* Footer content */}
        </div>
      </footer>
    </div>
  );
}
```

## Component Variants

```typescript
// ✅ Use consistent component variants
export function VariantComponent({ variant, size }: ComponentProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700",
    error: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <div className={`
      inline-flex
      items-center
      justify-center
      rounded-md
      font-medium
      transition-colors
      ${variants[variant]}
      ${sizes[size]}
    `}>
      Content
    </div>
  );
}
```

## Accessibility Styling

```typescript
// ✅ Implement accessible styling
export function AccessibleComponent() {
  return (
    <button
      className="
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        aria-disabled:opacity-50
      "
      aria-label="Close dialog"
    >
      <span className="sr-only">Close</span>
      ×
    </button>
  );
}
```

## Custom CSS

```css
/* ✅ Use custom CSS only when necessary */
.custom-component {
  /* Custom styles that can't be achieved with Tailwind */
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  backdrop-filter: blur(10px);
}

/* ✅ Use CSS variables for theming */
:root {
  --primary: 220 14.3% 95.9%;
  --primary-foreground: 220.9 39.3% 11%;
  --secondary: 220 14.3% 95.9%;
  --secondary-foreground: 220.9 39.3% 11%;
  --muted: 220 14.3% 95.9%;
  --muted-foreground: 220 8.9% 46.1%;
  --accent: 220 14.3% 95.9%;
  --accent-foreground: 220.9 39.3% 11%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 220 13% 91%;
  --background: 0 0% 100%;
  --foreground: 220.9 39.3% 11%;
}

.dark {
  --primary: 220.9 39.3% 11%;
  --primary-foreground: 210 40% 98%;
  --secondary: 215 27.9% 16.9%;
  --secondary-foreground: 210 40% 98%;
  --muted: 215 27.9% 16.9%;
  --muted-foreground: 217.9 10.6% 64.9%;
  --accent: 215 27.9% 16.9%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 215 27.9% 16.9%;
  --input: 215 27.9% 16.9%;
  --ring: 215 27.9% 16.9%;
  --background: 220.9 39.3% 11%;
  --foreground: 210 40% 98%;
}
```

## Best Practices

- Use Tailwind utility classes by default
- Create custom CSS only when necessary
- Use CSS variables for theming
- Follow the established color system
- Use responsive design patterns
- Implement dark mode support
- Use proper animations and transitions
- Style forms consistently
- Use consistent layout patterns
- Implement accessible styling
- Use proper component variants
- Follow the established patterns in the codebase
- Use proper class naming conventions
- Implement proper hover and focus states
- Use proper spacing and typography
- Follow the established design system

