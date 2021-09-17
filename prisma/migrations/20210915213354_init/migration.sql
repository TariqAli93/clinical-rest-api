-- DropForeignKey
ALTER TABLE `prescriptionmedications` DROP FOREIGN KEY `prescriptionmedications_ibfk_2`;

-- AddForeignKey
ALTER TABLE `PrescriptionMedications` ADD FOREIGN KEY (`medicationId`) REFERENCES `Medications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
