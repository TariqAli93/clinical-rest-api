/*
  Warnings:

  - You are about to drop the column `createdAt` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `specialize` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the `doctorcertificate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[doctorEmail]` on the table `Doctors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[doctorPhone]` on the table `Doctors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doctorId` to the `Certificates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorEmail` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorPhone` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `doctorcertificate` DROP FOREIGN KEY `doctorcertificate_ibfk_1`;

-- DropForeignKey
ALTER TABLE `doctorcertificate` DROP FOREIGN KEY `doctorcertificate_ibfk_2`;

-- DropIndex
DROP INDEX `Doctors.email_unique` ON `doctors`;

-- DropIndex
DROP INDEX `Doctors.phoneNumber_unique` ON `doctors`;

-- AlterTable
ALTER TABLE `certificates` ADD COLUMN `doctorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `doctors` DROP COLUMN `createdAt`,
    DROP COLUMN `email`,
    DROP COLUMN `phoneNumber`,
    DROP COLUMN `specialize`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `doctorEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `doctorPhone` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `doctorcertificate`;

-- CreateIndex
CREATE UNIQUE INDEX `Doctors.doctorEmail_unique` ON `Doctors`(`doctorEmail`);

-- CreateIndex
CREATE UNIQUE INDEX `Doctors.doctorPhone_unique` ON `Doctors`(`doctorPhone`);

-- AddForeignKey
ALTER TABLE `Certificates` ADD FOREIGN KEY (`doctorId`) REFERENCES `Doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
