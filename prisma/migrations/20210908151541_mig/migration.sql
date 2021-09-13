/*
  Warnings:

  - Added the required column `assistantPassword` to the `Assistants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorPassword` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assistants` ADD COLUMN `assistantPassword` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `doctorPassword` VARCHAR(191) NOT NULL;
