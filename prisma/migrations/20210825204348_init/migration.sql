/*
  Warnings:

  - Made the column `provinceId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- AlterTable
ALTER TABLE `users` MODIFY `provinceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD FOREIGN KEY (`provinceId`) REFERENCES `Provinces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
