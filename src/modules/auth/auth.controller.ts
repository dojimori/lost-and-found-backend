import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from 'bcryptjs'


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // check if the email already existed
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return res.status(409).json({ message: 'User already exists.' });
        }
        const salt = bcrypt.genSaltSync(10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password, salt)
            }
        })

        res.status(201).json({ message: 'Account registered successfully.' })
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }


} 