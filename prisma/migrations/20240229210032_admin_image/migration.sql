/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Admin_imagePath_key` ON `Admin`;

-- AlterTable
ALTER TABLE `Admin` DROP COLUMN `imagePath`,
    ADD COLUMN `image` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_image_key` ON `Admin`(`image`);
