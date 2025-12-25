import { prisma } from "../../lib/prisma";
import type { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
    try {
        // res.status(200).json({ tempDB });
        const lostItems = await prisma.lostItem.findMany({
            take: 15,
            include: {
                founder: true
            }
        });
        res.status(200).json({ lostItems });

    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
        console.log(error)
    }
}


export const store = async (req: Request, res: Response) => {
    try {
        const { itemName, description } = req.body;
        const file = req.file;


        if (!file) {
            return res.status(409).json({ message: 'Image is required' });
        }

        await prisma.lostItem.create({
            data: {
                name: itemName,
                description,
                image: file.filename,
                founder: {
                    connect: { id: (req as any).user.id }
                }
            }
        })

        res.status(201).json({ message: 'lost item posted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
        console.log(error)
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const item = await prisma.lostItem.findUnique({
            where: {
                id
            },
            include: {
                founder: true
            }
        });


        return res.status(200).send({ item })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
        console.log(error)
    }
}