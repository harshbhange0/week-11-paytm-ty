/*
  Warnings:

  - A unique constraint covering the columns `[senderId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_senderId_key" ON "Transaction"("senderId");
