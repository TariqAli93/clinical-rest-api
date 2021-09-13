/*
  Warnings:

  - Added the required column `patientId` to the `DoctorAppointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PatientPrescriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PrescriptionMedications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctorappointments` ADD COLUMN `patientId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patientprescriptions` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `prescriptionmedications` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `DoctorAppointments` ADD FOREIGN KEY (`patientId`) REFERENCES `Patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
