/*
  Warnings:

  - Added the required column `clinicId` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `clinicId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Clinics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clinicName` VARCHAR(191) NOT NULL,
    `clinicPhone` VARCHAR(191) NOT NULL,
    `clinicEmail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Clinics.clinicName_unique`(`clinicName`),
    UNIQUE INDEX `Clinics.clinicPhone_unique`(`clinicPhone`),
    UNIQUE INDEX `Clinics.clinicEmail_unique`(`clinicEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Doctors` ADD FOREIGN KEY (`clinicId`) REFERENCES `Clinics`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
