-- CreateTable
CREATE TABLE `Assistants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assistantName` VARCHAR(191) NOT NULL,
    `assistantPhone` VARCHAR(191) NOT NULL,
    `assistantEmail` VARCHAR(191) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `provinceId` INTEGER NOT NULL,
    `doctorId` INTEGER NOT NULL,

    UNIQUE INDEX `Assistants.assistantName_unique`(`assistantName`),
    UNIQUE INDEX `Assistants.assistantPhone_unique`(`assistantPhone`),
    UNIQUE INDEX `Assistants.assistantEmail_unique`(`assistantEmail`),
    UNIQUE INDEX `Assistants_doctorId_unique`(`doctorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Assistants` ADD FOREIGN KEY (`provinceId`) REFERENCES `Provinces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assistants` ADD FOREIGN KEY (`doctorId`) REFERENCES `Doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
