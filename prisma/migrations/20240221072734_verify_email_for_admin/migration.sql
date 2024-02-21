-- DropForeignKey
ALTER TABLE `VerifyEmail` DROP FOREIGN KEY `VerifyEmail_userId_fkey`;

-- AlterTable
ALTER TABLE `VerifyEmail` ADD COLUMN `adminId` VARCHAR(191) NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `VerifyEmail` ADD CONSTRAINT `VerifyEmail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifyEmail` ADD CONSTRAINT `VerifyEmail_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
