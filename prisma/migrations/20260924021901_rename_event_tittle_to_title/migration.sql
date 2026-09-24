/*
  Warnings:

  - You are about to drop the column `tittle` on the `event` table. All the data in the column will be lost.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `tittle`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
