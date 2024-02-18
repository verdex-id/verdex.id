/*
  Warnings:

  - Made the column `refreshToken` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Session` MODIFY `refreshToken` VARCHAR(191) NOT NULL;
