import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const characterSchema = Joi.object({
    name: Joi.string().required(),
    rarity: Joi.number().required()
});


const getCharacter = async (req, res) => {
    try {
        const { id } = req.params;

        const character = await prisma.character.findUnique({
            where: { id: Number(id) },
            // include: {
            //     rarity: true,
            // },
        });

        if (!character) {
            return res
            .status(200)
            .json({ msg: `No Character with the id: ${id} found`});
        }

        return res.json({
            data: character,
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

const getCharacters = async (req, res) => {
    try {
        const characters = await prisma.character.findMany({
            // include: {
            //     rarity: true,
            // },
        });

        if (characters.length === 0) {
            return res.status(200).json({ msg: "No characters found"});
        }
        return res.json({ 
            data: characters
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};


const createCharacter = async (req, res) => {
    try {
        const { error, value } = characterSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                msg: error.details[0].message,
            });
        }

        const  {name, rarity } = value;

        await prisma.character.create({
            data: {name, rarity },
        });

        const newCharacters = await prisma.character.findMany({
            // include: {
            //     rarity: true,
            // },
        });

        return res.status(201).json({
            msg: "Character successfully created",
            data: newCharacters,
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

const updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value }= characterSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                msg: error.details[0].message,
            });
        }

        const { name, rarity } = value;

        const updatedCharacter = await prisma.character.update({
            where: { id: Number(id) },
            data: { name, rarity },
        });

        return res.status(200).json({
            msg: `Character with the id: ${id} successfully updated`,
            data: updatedCharacter,
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

const deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;

        const character = await prisma.character.findUnique({
            where: { id: Number(id) },
        });

        if (!character) {
            return res
            .status(200)
            .json({ msg: `No character with the id: ${id} found`});
        }

        await prisma.character.delete({
            where: { id: Number(id) },
        });

        return res.json({
            data: character,
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};


export {
    getCharacter,
    getCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter
};