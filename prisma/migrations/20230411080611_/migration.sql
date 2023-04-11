-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
