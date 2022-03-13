/*
  Warnings:

  - Added the required column `sellableid` to the `SoldOut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `soldout` ADD COLUMN `sellableid` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SoldOut` ADD CONSTRAINT `SoldOut_sellableid_fkey` FOREIGN KEY (`sellableid`) REFERENCES `Sellables`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
