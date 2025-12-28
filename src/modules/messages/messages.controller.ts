import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const storeMessage = async (req: Request, res: Response) => {
  try {
    // senderid, receiverid, message
    const { receiverId, message } = req.body;
    const senderId = (req as any).user.id;

    await prisma.message.create({
      data: {
        message,
        sender: {
          connect: { id: senderId },
        },
        receiver: {
          connect: { id: receiverId },
        },
      },
    });

    res.status(201).json({ message: " message stored " });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    // soooooo, we'll get the authed user's id
    // and the chats associated with a specific user (receiver)

    // const { senderId, receiverId, message } = req.body;
    const receiverId = req.params.id;
    const senderId = (req as any).user.id;

    const messages = await prisma.message.findMany({
      take: 12,
      where: {
        OR: [
          {
            sender: {
              id: senderId,
            },
            receiver: {
              id: receiverId,
            },
          },
           {
            receiver: {
              id: senderId,
            },
            sender: {
              id: receiverId,
            },
          },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(201).json({ messages });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};
