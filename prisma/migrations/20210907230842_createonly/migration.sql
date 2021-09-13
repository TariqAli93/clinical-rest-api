/*
  Warnings:

  - Added the required column `updatedAt` to the `Clinics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clinics` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
