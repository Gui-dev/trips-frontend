/*
  Warnings:

  - Added the required column `location_description` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "location_description" TEXT NOT NULL;
