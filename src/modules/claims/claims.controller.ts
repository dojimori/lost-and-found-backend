import { Response, Request } from "express";
import { prisma } from "../../lib/prisma";
import { connect } from "node:http2";


export const claimItem = async (req: Request, res: Response) => {
  try {
      // first is getting the item
      const { postId, message, clue1, clue2, clue3 } = req.body
      console.log(req.body)
      const item = await prisma.lostItem.findUnique({
        where: { id: postId },
        include: {
          founder: true
        }
      });
      
      if (!item) {
        return;
      }

      // second
      const claim = await prisma.claim.create({
        data: {
          message,
          clue1: clue1 ?? undefined,
          clue2: clue2 ?? undefined,
          clue3: clue3 ?? undefined,
          founder: {
            connect: {
              id: item.founder.id
            }
          },
          claimee: {
            connect: { id: (req as any).user.id }
          },
          item: {
            connect: { id: item.id }
          }
        }
      })

      return res.status(200).json(claim)
  } catch (error) {
    console.log(error)
  }
}