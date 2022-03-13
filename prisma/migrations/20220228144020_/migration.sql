/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `faucilitytypes` table. All the data in the column will be lost.
  - Added the required column `faviconCode` to the `FaucilityTypes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `faucilitytypes` DROP COLUMN `logoUrl`,
    ADD COLUMN `faviconCode` VARCHAR(191) NOT NULL;
