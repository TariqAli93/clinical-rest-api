-- AlterTable
ALTER TABLE `medications` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `patientprescriptions` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `prescriptionmedications` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
