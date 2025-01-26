/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Experience_title_key" ON "Experience"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");
