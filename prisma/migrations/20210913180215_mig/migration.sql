-- CreateTable
CREATE TABLE `_MedicationsToPrescriptionMedications` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MedicationsToPrescriptionMedications_AB_unique`(`A`, `B`),
    INDEX `_MedicationsToPrescriptionMedications_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MedicationsToPrescriptionMedications` ADD FOREIGN KEY (`A`) REFERENCES `Medications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MedicationsToPrescriptionMedications` ADD FOREIGN KEY (`B`) REFERENCES `PrescriptionMedications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
