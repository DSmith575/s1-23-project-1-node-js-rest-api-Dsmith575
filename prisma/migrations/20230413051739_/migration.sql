-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hp" INTEGER NOT NULL,
    "mp" INTEGER NOT NULL,
    "pwr" INTEGER NOT NULL,
    "spd" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "spr" INTEGER NOT NULL,
    "lck" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    CONSTRAINT "Attribute_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rarity" INTEGER NOT NULL,
    "className" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    CONSTRAINT "Rarity_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_characterId_key" ON "Attribute"("characterId");
