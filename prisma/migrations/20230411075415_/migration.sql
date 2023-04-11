-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Attributes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hp" INTEGER NOT NULL,
    "mp" INTEGER NOT NULL,
    "pwr" INTEGER NOT NULL,
    "spd" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "spr" INTEGER NOT NULL,
    "lck" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    CONSTRAINT "Attributes_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Attributes_characterId_key" ON "Attributes"("characterId");
