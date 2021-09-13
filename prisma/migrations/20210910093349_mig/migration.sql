/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Appointments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[time]` on the table `Appointments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `time` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointments` ADD COLUMN `time` VARCHAR(191) NOT NULL,
    MODIFY `date` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Appointments.date_unique` ON `Appointments`(`date`);

-- CreateIndex
CREATE UNIQUE INDEX `Appointments.time_unique` ON `Appointments`(`time`);
