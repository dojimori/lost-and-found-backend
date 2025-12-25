/*
  Warnings:

  - The primary key for the `lostitem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `lostitem` DROP FOREIGN KEY `LostItem_founderId_fkey`;

-- DropIndex
DROP INDEX `LostItem_founderId_fkey` ON `lostitem`;

-- AlterTable
ALTER TABLE `lostitem` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `founderId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `LostItem` ADD CONSTRAINT `LostItem_founderId_fkey` FOREIGN KEY (`founderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
