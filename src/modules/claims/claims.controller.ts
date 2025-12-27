import { Response, Request } from "express";
import { prisma } from "../../lib/prisma";
import { connect } from "node:http2";

export const claimItem = async (req: Request, res: Response) => {
  try {
    // first is getting the item
    const { postId, message, clue1, clue2, clue3 } = req.body;

    if (!postId || !message.trim() ) {
      return res.status(400).json({ message: "Please fill in missing fields." });
    }
    const item = await prisma.lostItem.findUnique({
      where: { id: postId },
      include: {
        founder: true,
      },
    });

    if (!item) {
      return;
    }

    // check if the user already claimed the item
    const findClaim = await prisma.claim.findFirst({
      where: {
        claimee: { id: (req as any).user.id },
        founder: { id: item.founder.id },
        item: { id: item.id },
      },
    });

    if (findClaim) {
      return res
        .status(409)
        .json({
          message:
            "You already claimed this item, please wait for the founder's response.",
        });
    }

    // create
    const claim = await prisma.claim.create({
      data: {
        message,
        clue1: clue1 ?? undefined,
        clue2: clue2 ?? undefined,
        clue3: clue3 ?? undefined,
        founder: {
          connect: {
            id: item.founder.id,
          },
        },
        claimee: {
          connect: { id: (req as any).user.id },
        },
        item: {
          connect: { id: item.id },
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Item claimed! Please wait for the founder's response" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


export const getMyClaimedItems = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; 
    const claims = await prisma.claim.findMany({
      where: {
        claimee: { id: userId }
      },
      include: {
        item: {
          include: {
            founder: true
          }
        }
      }
    })

    return res
      .status(200)
      .json(claims)
  } catch(error) {
    console.log(error);
    return res.status(500).json(error);

  }
}