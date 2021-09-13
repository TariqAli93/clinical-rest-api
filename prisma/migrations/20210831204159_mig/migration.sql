/*
  Warnings:

  - Added the required column `provinceId` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `provinceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Doctors` ADD FOREIGN KEY (`provinceId`) REFERENCES `Provinces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
