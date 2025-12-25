import { prisma } from "../../lib/prisma";
import type { Request, Response } from "express";

export const getItems = async (req: Request, res: Response) => {
    try {
        // res.status(200).json({ tempDB });
        const lostItems = await prisma.lostItem.findMany({
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


export const storeItem = async (req: Request, res: Response) => {
    try {
        // TODO: assign a post to a user (which is the founder of the lost item)
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