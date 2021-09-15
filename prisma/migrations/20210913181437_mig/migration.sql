/*
  Warnings:

  - You are about to drop the `_medicationstoprescriptionmedications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_medicationstoprescriptionmedications` DROP FOREIGN KEY `_medicationstoprescriptionmedications_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_medicationstoprescriptionmedications` DROP FOREIGN KEY `_medicationstoprescriptionmedications_ibfk_2`;

-- DropTable
DROP TABLE `_medicationstoprescriptionmedications`;
