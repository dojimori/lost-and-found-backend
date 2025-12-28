import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // TODO: update or create user profile


    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};