-- DropIndex
DROP INDEX `Session_refreshToken_key` ON `Session`;

-- AlterTable
ALTER TABLE `Session` MODIFY `refreshToken` TEXT NULL;
