/**
 * API Controller for managing character data.
 *
 * This controller handles CRUD operations related to character creation 
 *
 * @file: characters.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-19
 * @updated: 2023-04-19
 * 
 * @SCHEMA
 */

import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const elementSchema = Joi.object({
    element: Joi.string().required(),
    characterId: Joi.number().required()
});

const getElement = async (req, res) => {
    try {
        const { id } = req.params;

        const element = await prisma.element.findUnique({
            where: { id: Number(id) },
        });

        if (!element) {
            return res
            .status(200)
            .json({ msg: `No element with the id: ${id} found`});
        }

        return res.json({
            data: element,
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

const getElements = async (req, res) => {
    try {
        const elements = await prisma.element.findMany({
            select: {
                character: {
                    select: {
                        name: true,
                    },
            },
            element: true,
            },
        });

        if (elements.length === 0 ) {
            return res.status(200).json({ msg: "No elements found"});
        }
        return res.json({
            data: elements,
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

const createElement = async (req, res) => {
    try {
        const { error, value } = elementSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                msg: error.details[0].message,
            });
        }

        const { element, characterId } = value;

        await prisma.element.create({
            data: { element, characterId },
        });

        const newElements = await prisma.element.findMany({

        });

        return res.status(201).json({
            msg: "Character element created successfully",
            data: newElements,
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

const updateElement = async (req, res) => {
    try {
        const { id } = req.params;
        const {error, value } = elementSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                msg: error.details[0].message,
            });
        }

        const { element, characterId } = value;

        const updatedElement = await prisma.element.update({
            where: { id: Number(id) },
            data: { element, characterId },
        });

        return res.status(200).json({
            msg: `Element with the id: ${id} successfully updated`,
            data: updatedElement,
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

const deleteElement = async (req, res) => {
    try {
        const { id } = req.params;

        const element = await prisma.element.findUnique({
            where: { id: Number(id) },
        });

        if (!element) {
            return res
            .status(200)
            .json({ msg: `No element with the id: ${id} found`});
        }

        await prisma.element.delete({
            where: { id: Number(id) },
        });

        return res.json({
            data: element,
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

export {
    getElement,
    getElements,
    createElement,
    updateElement,
    deleteElement,
};