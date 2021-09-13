/*
  Warnings:

  - Added the required column `clinicLocation` to the `Clinics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clinics` ADD COLUMN `clinicLocation` VARCHAR(191) NOT NULL;
