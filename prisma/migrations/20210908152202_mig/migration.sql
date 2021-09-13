/*
  Warnings:

  - Added the required column `assistantFullName` to the `Assistants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorFullName` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assistants` ADD COLUMN `assistantFullName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `doctorFullName` VARCHAR(191) NOT NULL;
