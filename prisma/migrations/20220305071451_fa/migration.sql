/*
  Warnings:

  - You are about to drop the column `faviconCode` on the `facilitytypes` table. All the data in the column will be lost.
  - Added the required column `fontawsomeClass` to the `FacilityTypes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `facilitytypes` DROP COLUMN `faviconCode`,
    ADD COLUMN `fontawsomeClass` VARCHAR(191) NOT NULL;
