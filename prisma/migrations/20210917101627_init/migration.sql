/*
  Warnings:

  - You are about to drop the `privilege` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `privilege` DROP FOREIGN KEY `privilege_ibfk_1`;

-- DropForeignKey
ALTER TABLE `privilege` DROP FOREIGN KEY `privilege_ibfk_2`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- DropTable
DROP TABLE `privilege`;

-- DropTable
DROP TABLE `roles`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `provinceId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Admin.userName_unique`(`userName`),
    UNIQUE INDEX `Admin.email_unique`(`email`),
    UNIQUE INDEX `Admin.phoneNumber_unique`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admin` ADD FOREIGN KEY (`provinceId`) REFERENCES `Provinces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
