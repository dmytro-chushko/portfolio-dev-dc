# Database & Prisma Rules

## Prisma Schema

- Use descriptive model names
- Implement proper relationships with foreign keys
- Use enums for fixed value sets
- Add proper indexes for performance
- Use cascade deletes where appropriate

## Schema Patterns

### Model Definition

```prisma
// ✅ Use descriptive model names
model Hero {
  id           String            @id @default(uuid())
  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt
  isActive     Boolean           @default(false)
  heroVersion  String            @unique
  heroPhoto    String
  translations HeroTranslation[]

  @@map("heroes")
}
```

### Relationships

```prisma
// ✅ Use proper relationships
model HeroTranslation {
  id         String   @id @default(uuid())
  hero       Hero     @relation(fields: [heroId], references: [id], onDelete: Cascade)
  heroId     String
  language   Language @relation(fields: [languageId], references: [id])
  languageId String
  heroName   String
  heroDescription String

  @@unique([heroId, languageId])
  @@map("hero_translations")
}
```

### Enums

```prisma
// ✅ Use enums for fixed value sets
enum LangType {
  en
  ua
}
```

## Database Operations

### Prisma Client Usage

```typescript
// ✅ Always use Prisma client for database operations
import { prisma } from '@/lib/clients/prismaClient';

export async function getHeroes(): Promise<Hero[]> {
  try {
    const heroes = await prisma.hero.findMany({
      include: {
        translations: {
          include: {
            language: true,
          },
        },
      },
    });

    return heroes;
  } catch (error) {
    console.error('Error fetching heroes:', error);
    throw new Error('Failed to fetch heroes');
  }
}
```

### Error Handling

```typescript
// ✅ Implement proper error handling
export async function createHero(data: CreateHeroData): Promise<Hero> {
  try {
    const hero = await prisma.hero.create({
      data: {
        heroVersion: data.heroVersion,
        heroPhoto: data.heroPhoto,
        translations: {
          create: data.translations.map((translation) => ({
            languageId: translation.languageId,
            heroName: translation.heroName,
            heroDescription: translation.heroDescription,
          })),
        },
      },
      include: {
        translations: {
          include: {
            language: true,
          },
        },
      },
    });

    return hero;
  } catch (error) {
    console.error('Error creating hero:', error);
    throw new Error('Failed to create hero');
  }
}
```

### Transactions

```typescript
// ✅ Use transactions for complex operations
export async function updateHeroWithTranslations(
  heroId: string,
  data: UpdateHeroData
): Promise<Hero> {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Update hero
      const hero = await tx.hero.update({
        where: { id: heroId },
        data: {
          heroVersion: data.heroVersion,
          heroPhoto: data.heroPhoto,
        },
      });

      // Update translations
      for (const translation of data.translations) {
        await tx.heroTranslation.upsert({
          where: {
            heroId_languageId: {
              heroId: heroId,
              languageId: translation.languageId,
            },
          },
          update: {
            heroName: translation.heroName,
            heroDescription: translation.heroDescription,
          },
          create: {
            heroId: heroId,
            languageId: translation.languageId,
            heroName: translation.heroName,
            heroDescription: translation.heroDescription,
          },
        });
      }

      return hero;
    });

    return result;
  } catch (error) {
    console.error('Error updating hero:', error);
    throw new Error('Failed to update hero');
  }
}
```

## Data Validation

### Input Validation

```typescript
// ✅ Validate data before database operations
import * as yup from 'yup';

const createHeroSchema = yup.object({
  heroVersion: yup.string().required().min(1).max(100),
  heroPhoto: yup.string().required().url(),
  translations: yup
    .array()
    .of(
      yup.object({
        languageId: yup.string().required(),
        heroName: yup.string().required().min(1).max(200),
        heroDescription: yup.string().required().min(1).max(1000),
      })
    )
    .required()
    .min(1),
});

export async function createHero(data: unknown): Promise<Hero> {
  // Validate input
  const validatedData = await createHeroSchema.validate(data);

  // Proceed with database operation
  return await prisma.hero.create({
    data: validatedData,
  });
}
```

### Type Guards

```typescript
// ✅ Use type guards for runtime validation
function isValidHeroData(data: any): data is CreateHeroData {
  return (
    data &&
    typeof data.heroVersion === 'string' &&
    typeof data.heroPhoto === 'string' &&
    Array.isArray(data.translations) &&
    data.translations.every(
      (t: any) =>
        typeof t.languageId === 'string' &&
        typeof t.heroName === 'string' &&
        typeof t.heroDescription === 'string'
    )
  );
}
```

## Query Optimization

### Include Relations

```typescript
// ✅ Use proper include patterns
export async function getHeroWithTranslations(
  heroId: string
): Promise<HeroWithTranslations | null> {
  return await prisma.hero.findUnique({
    where: { id: heroId },
    include: {
      translations: {
        include: {
          language: true,
        },
      },
    },
  });
}
```

### Select Specific Fields

```typescript
// ✅ Select only needed fields for performance
export async function getHeroBasicInfo(
  heroId: string
): Promise<HeroBasicInfo | null> {
  return await prisma.hero.findUnique({
    where: { id: heroId },
    select: {
      id: true,
      heroVersion: true,
      heroPhoto: true,
      isActive: true,
    },
  });
}
```

### Pagination

```typescript
// ✅ Implement proper pagination
export async function getHeroesPaginated(
  page: number = 1,
  limit: number = 10
): Promise<{ heroes: Hero[]; total: number; pages: number }> {
  const skip = (page - 1) * limit;

  const [heroes, total] = await Promise.all([
    prisma.hero.findMany({
      skip,
      take: limit,
      include: {
        translations: {
          include: {
            language: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.hero.count(),
  ]);

  return {
    heroes,
    total,
    pages: Math.ceil(total / limit),
  };
}
```

## Migration Patterns

### Schema Changes

```prisma
// ✅ Use proper migration patterns
model Hero {
  id           String            @id @default(uuid())
  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt
  isActive     Boolean           @default(false)
  heroVersion  String            @unique
  heroPhoto    String
  translations HeroTranslation[]

  // Add indexes for performance
  @@index([isActive])
  @@index([createdAt])
  @@map("heroes")
}
```

### Data Migration

```typescript
// ✅ Use proper data migration patterns
export async function migrateHeroData() {
  try {
    await prisma.$transaction(async (tx) => {
      // Migrate data in batches
      const heroes = await tx.hero.findMany({
        where: {
          // Migration conditions
        },
      });

      for (const hero of heroes) {
        await tx.hero.update({
          where: { id: hero.id },
          data: {
            // Migration data
          },
        });
      }
    });
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}
```

## Connection Management

### Prisma Client Configuration

```typescript
// ✅ Use proper Prisma client configuration
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty',
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### Connection Pooling

```typescript
// ✅ Configure connection pooling
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

## Best Practices

- Use descriptive model names
- Implement proper relationships
- Use enums for fixed value sets
- Add proper indexes for performance
- Use cascade deletes where appropriate
- Always validate data before database operations
- Use proper error handling
- Use transactions for complex operations
- Implement proper pagination
- Use proper include patterns
- Select only needed fields
- Use proper migration patterns
- Configure connection pooling
- Use proper logging
- Implement proper type safety
- Use proper query optimization
- Follow the established patterns in the codebase

