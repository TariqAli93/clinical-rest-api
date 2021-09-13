/*
  Warnings:

  - Added the required column `specialtiesId` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `specialtiesId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `specialties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `specialtyName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `specialties.specialtyName_unique`(`specialtyName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Doctors` ADD FOREIGN KEY (`specialtiesId`) REFERENCES `specialties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
