/*
  Warnings:

  - You are about to drop the column `userId` on the `provinces` table. All the data in the column will be lost.
  - Added the required column `provinceId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `provinces` DROP FOREIGN KEY `provinces_ibfk_1`;

-- AlterTable
ALTER TABLE `provinces` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `provinceId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD FOREIGN KEY (`provinceId`) REFERENCES `Provinces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
