import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from 'bcryptjs'


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please fill in missing fields.' });
        }

        if (password != confirmPassword) {
            return res.status(400).json({ message: 'Password does not match.' });
        }

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

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill in missing fields.' });
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(404).json({ message: 'User not found.' });
        }

        (req.session as any).user = {
            id: user.id,
            email: user.email,
            name: user.name
        };

        return res.status(200).json({ message: 'Login successfully.' });

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}