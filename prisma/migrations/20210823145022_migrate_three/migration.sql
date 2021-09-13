-- AlterTable
ALTER TABLE `users` ADD COLUMN `deleted_at` DATETIME(3),
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
