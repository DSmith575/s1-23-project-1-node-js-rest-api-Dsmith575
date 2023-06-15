-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "affinity" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Element" (
    "id" SERIAL NOT NULL,
    "element" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "hp" INTEGER NOT NULL,
    "mp" INTEGER NOT NULL,
    "pwr" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "spd" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "spr" INTEGER NOT NULL,
    "lck" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" SERIAL NOT NULL,
    "rarity" INTEGER NOT NULL,
    "className" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Affinity_bonus" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "Affinity_bonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personality" (
    "id" SERIAL NOT NULL,
    "personality" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Personality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Element_characterId_key" ON "Element"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_characterId_key" ON "Attribute"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Affinity_bonus_characterId_key" ON "Affinity_bonus"("characterId");

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rarity" ADD CONSTRAINT "Rarity_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affinity_bonus" ADD CONSTRAINT "Affinity_bonus_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personality" ADD CONSTRAINT "Personality_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
