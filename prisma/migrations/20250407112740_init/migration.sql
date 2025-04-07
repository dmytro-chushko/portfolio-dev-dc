-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroTranslation" (
    "id" TEXT NOT NULL,
    "heroId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "heroName" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,

    CONSTRAINT "HeroTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "heroVersion" TEXT NOT NULL,
    "heroPhoto" TEXT NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "HeroTranslation_languageId_key" ON "HeroTranslation"("languageId");

-- CreateIndex
CREATE UNIQUE INDEX "HeroTranslation_heroId_languageId_key" ON "HeroTranslation"("heroId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Hero_heroVersion_key" ON "Hero"("heroVersion");

-- AddForeignKey
ALTER TABLE "HeroTranslation" ADD CONSTRAINT "HeroTranslation_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroTranslation" ADD CONSTRAINT "HeroTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
