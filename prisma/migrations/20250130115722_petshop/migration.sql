/*
  Warnings:

  - You are about to drop the column `deadlineVaccination` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Petshop` table. All the data in the column will be lost.
  - Added the required column `deadline_vaccination` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "deadline_vaccination" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petshopCNPJ" TEXT NOT NULL,
    CONSTRAINT "Pet_petshopCNPJ_fkey" FOREIGN KEY ("petshopCNPJ") REFERENCES "Petshop" ("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("createdAt", "description", "id", "name", "petshopCNPJ", "type", "vaccinated") SELECT "createdAt", "description", "id", "name", "petshopCNPJ", "type", "vaccinated" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
CREATE TABLE "new_Petshop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL
);
INSERT INTO "new_Petshop" ("cnpj", "id", "name") SELECT "cnpj", "id", "name" FROM "Petshop";
DROP TABLE "Petshop";
ALTER TABLE "new_Petshop" RENAME TO "Petshop";
CREATE UNIQUE INDEX "Petshop_cnpj_key" ON "Petshop"("cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
