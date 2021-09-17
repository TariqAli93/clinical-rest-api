/*
  Warnings:

  - You are about to drop the column `doctorsId` on the `doctorprescriptions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `doctorprescriptions` DROP FOREIGN KEY `doctorprescriptions_ibfk_1`;

-- AlterTable
ALTER TABLE `doctorprescriptions` DROP COLUMN `doctorsId`;

-- AddForeignKey
ALTER TABLE `DoctorPrescriptions` ADD FOREIGN KEY (`doctorId`) REFERENCES `Doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
