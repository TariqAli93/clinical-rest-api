/*
  Warnings:

  - Added the required column `doctorDob` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `doctorDob` DATETIME(3) NOT NULL;
