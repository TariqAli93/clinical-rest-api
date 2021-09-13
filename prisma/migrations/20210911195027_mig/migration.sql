/*
  Warnings:

  - You are about to drop the column `date` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `appointments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dateTime]` on the table `Appointments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateTime` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointments` DROP COLUMN `date`,
    DROP COLUMN `time`,
    ADD COLUMN `dateTime` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Appointments.dateTime_unique` ON `Appointments`(`dateTime`);
