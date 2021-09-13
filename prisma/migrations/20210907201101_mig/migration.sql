/*
  Warnings:

  - Added the required column `clinicAddress` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinicDistrict` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceId` to the `Clinics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clinics` ADD COLUMN `clinicAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `clinicDistrict` VARCHAR(191) NOT NULL,
    ADD COLUMN `provinceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Clinics` ADD FOREIGN KEY (`provinceId`) REFERENCES `Provinces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
