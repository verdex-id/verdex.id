/*
  Warnings:

  - A unique constraint covering the columns `[imagePath]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `imagePath` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_imagePath_key` ON `Admin`(`imagePath`);
