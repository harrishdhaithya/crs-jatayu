/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Hotel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Hotel_phoneNumber_key` ON `Hotel`(`phoneNumber`);
