-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "affinity" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Element" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "element" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    CONSTRAINT "Element_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hp" INTEGER NOT NULL,
    "mp" INTEGER NOT NULL,
    "pwr" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "Affinity_bonus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bonus5" TEXT NOT NULL,
    "bonus15" TEXT NOT NULL,
    "bonus30" TEXT NOT NULL,
    "bonus50" TEXT NOT NULL,
    "bonus75" TEXT NOT NULL,
    "bonus80" TEXT NOT NULL,
    "bonus105" TEXT NOT NULL,
    "bonus120" TEXT NOT NULL,
    "bonus140" TEXT NOT NULL,
    "bonus175" TEXT NOT NULL,
    "bonus200" TEXT NOT NULL,
    "bonus215" TEXT NOT NULL,
    "bonus225" TEXT NOT NULL,
    "bonus255" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    CONSTRAINT "Affinity_bonus_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Personality" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personality" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    CONSTRAINT "Personality_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_characterId_key" ON "Attribute"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Affinity_bonus_characterId_key" ON "Affinity_bonus"("characterId");
