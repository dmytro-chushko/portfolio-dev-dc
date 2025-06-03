/*
  Warnings:

  - Changed the type of `code` on the `Language` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LangType" AS ENUM ('en', 'ua');

-- AlterTable
ALTER TABLE "Language"
ALTER COLUMN "code" TYPE "LangType" USING "code"::"LangType";

