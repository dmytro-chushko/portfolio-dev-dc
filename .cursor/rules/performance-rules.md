# Performance & Optimization Rules

## Next.js Optimizations

- Use proper image optimization
- Implement proper caching strategies
- Use dynamic imports for code splitting
- Optimize bundle size

## React Optimizations

- Use proper memoization (useMemo, useCallback)
- Implement proper key props for lists
- Avoid unnecessary re-renders
- Use proper dependency arrays

## Image Optimization

### Next.js Image Component

```typescript
// ✅ Use Next.js Image component for optimization
import Image from 'next/image';

export function OptimizedImage() {
  return (
    <Image
      src="/hero-photo-placeholder.png"
      alt="Hero photo"
      width={300}
      height={300}
      priority // For above-the-fold images
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      className="rounded-lg"
    />
  );
}
```

### Responsive Images

```typescript
// ✅ Use responsive images
export function ResponsiveImage() {
  return (
    <Image
      src="/hero-photo-placeholder.png"
      alt="Hero photo"
      width={800}
      height={600}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="w-full h-auto"
    />
  );
}
```

## Code Splitting

### Dynamic Imports

```typescript
// ✅ Use dynamic imports for code splitting
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Disable SSR if not needed
});

export function LazyLoadedComponent() {
  return (
    <div>
      <h1>Main Content</h1>
      <HeavyComponent />
    </div>
  );
}
```

### Route-Based Code Splitting

```typescript
// ✅ Use route-based code splitting
const Dashboard = dynamic(() => import('@/components/Dashboard'), {
  loading: () => <div>Loading dashboard...</div>,
});

const Settings = dynamic(() => import('@/components/Settings'), {
  loading: () => <div>Loading settings...</div>,
});

export function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div>
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'settings' && <Settings />}
    </div>
  );
}
```

## Memoization

### useMemo

```typescript
// ✅ Use useMemo for expensive calculations
export function ExpensiveComponent({ data }: { data: any[] }) {
  const processedData = useMemo(() => {
    return data
      .filter(item => item.isActive)
      .map(item => ({
        ...item,
        processedAt: new Date().toISOString(),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### useCallback

```typescript
// ✅ Use useCallback for event handlers
export function InteractiveComponent({ onUpdate }: { onUpdate: (id: string) => void }) {
  const [items, setItems] = useState<Item[]>([]);

  const handleItemClick = useCallback((id: string) => {
    onUpdate(id);
  }, [onUpdate]);

  const handleAddItem = useCallback(() => {
    setItems(prev => [...prev, { id: Date.now().toString(), name: 'New Item' }]);
  }, []);

  return (
    <div>
      <button onClick={handleAddItem}>Add Item</button>
      {items.map(item => (
        <div key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

### React.memo

```typescript
// ✅ Use React.memo for component memoization
export const MemoizedComponent = memo(function Component({ data }: { data: any[] }) {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});

// ✅ Use custom comparison function
export const CustomMemoizedComponent = memo(
  function Component({ data }: { data: any[] }) {
    return (
      <div>
        {data.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison logic
    return prevProps.data.length === nextProps.data.length;
  }
);
```

## List Optimization

### Proper Key Props

```typescript
// ✅ Use proper key props for lists
export function OptimizedList({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.id} className="item">
          {item.name}
        </div>
      ))}
    </div>
  );
}

// ✅ Use stable keys
export function StableKeyList({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={`${item.id}-${index}`} className="item">
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

### Virtual Scrolling

```typescript
// ✅ Use virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

export function VirtualizedList({ items }: { items: Item[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <div className="item">
        {items[index].name}
      </div>
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

## Caching Strategies

### Next.js Caching

```typescript
// ✅ Use Next.js caching
export async function getHeroes(): Promise<Hero[]> {
  const heroes = await prisma.hero.findMany({
    include: {
      translations: {
        include: {
          language: true,
        },
      },
    },
    next: {
      revalidate: 3600, // Cache for 1 hour
      tags: ['heroes'],
    },
  });

  return heroes;
}
```

### React Query Caching

```typescript
// ✅ Use React Query for client-side caching
import { useQuery } from '@tanstack/react-query';

export function useHeroes() {
  return useQuery({
    queryKey: ['heroes'],
    queryFn: getHeroes,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
```

### Browser Caching

```typescript
// ✅ Implement proper browser caching
export async function GET(request: NextRequest) {
  const data = await getData();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      ETag: generateETag(data),
    },
  });
}
```

## Bundle Optimization

### Tree Shaking

```typescript
// ✅ Use tree shaking friendly imports
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// ❌ Avoid importing entire libraries
import * as lodash from 'lodash';

// ✅ Import only what you need
import { debounce } from 'lodash/debounce';
```

### Bundle Analysis

```typescript
// ✅ Analyze bundle size
// Add to package.json scripts:
// "analyze": "ANALYZE=true next build"

// Use @next/bundle-analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Next.js config
});
```

## Database Optimization

### Query Optimization

```typescript
// ✅ Optimize database queries
export async function getHeroesOptimized(): Promise<Hero[]> {
  return await prisma.hero.findMany({
    select: {
      id: true,
      heroVersion: true,
      heroPhoto: true,
      isActive: true,
      translations: {
        select: {
          heroName: true,
          heroDescription: true,
          language: {
            select: {
              code: true,
            },
          },
        },
      },
    },
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
```

### Connection Pooling

```typescript
// ✅ Use connection pooling
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'error', 'warn'],
  errorFormat: 'pretty',
});
```

## Performance Monitoring

### Web Vitals

```typescript
// ✅ Monitor Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Performance API

```typescript
// ✅ Use Performance API
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();

  console.log(`${name} took ${end - start} milliseconds`);
}

// Usage
measurePerformance('Expensive Operation', () => {
  // Expensive operation
});
```

## Lazy Loading

### Component Lazy Loading

```typescript
// ✅ Lazy load components
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

export function App() {
  return (
    <div>
      <h1>Main Content</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

### Image Lazy Loading

```typescript
// ✅ Lazy load images
export function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
```

## Best Practices

- Use Next.js Image component for optimization
- Implement proper caching strategies
- Use dynamic imports for code splitting
- Optimize bundle size
- Use proper memoization
- Implement proper key props for lists
- Avoid unnecessary re-renders
- Use proper dependency arrays
- Use virtual scrolling for large lists
- Optimize database queries
- Use connection pooling
- Monitor Web Vitals
- Use Performance API
- Lazy load components and images
- Use tree shaking friendly imports
- Analyze bundle size
- Implement proper error boundaries
- Use proper loading states
- Optimize for Core Web Vitals
- Use proper caching headers
- Implement proper prefetching
- Use proper compression
- Follow the established performance patterns

