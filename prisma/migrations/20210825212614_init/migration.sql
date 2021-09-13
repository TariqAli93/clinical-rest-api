/*
  Warnings:

  - Added the required column `certificateNumber` to the `Certificates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `certificates` ADD COLUMN `certificateNumber` VARCHAR(191) NOT NULL;
