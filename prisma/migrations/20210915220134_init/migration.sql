-- CreateTable
CREATE TABLE `DoctorPrescriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` INTEGER NOT NULL,
    `prescriptionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `doctorsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DoctorPrescriptions` ADD FOREIGN KEY (`doctorsId`) REFERENCES `Doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorPrescriptions` ADD FOREIGN KEY (`prescriptionId`) REFERENCES `Prescriptions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
