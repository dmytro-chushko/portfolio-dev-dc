-- DropForeignKey
ALTER TABLE "HeroTranslation" DROP CONSTRAINT "HeroTranslation_heroId_fkey";

-- AddForeignKey
ALTER TABLE "HeroTranslation" ADD CONSTRAINT "HeroTranslation_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
