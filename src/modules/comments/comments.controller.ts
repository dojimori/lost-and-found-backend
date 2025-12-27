import { Request, Response } from 'express'
import { prisma } from "../../lib/prisma";

export const index = async(req: Request, res: Response) => {
  try {
    const { content, postId } = req.body;
    const userId = (req as any).user.id;

    if (!content.trim()) {
         return res.status(400).json({ message: 'Please fill in required fields.' })
    }
    const post = await prisma.lostItem.findUnique({ 
      where: {
        id: postId
      }
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })

    }


    // store comment
    await prisma.comment.create({
      data: {
        content,
        user: {
          connect: { id: userId }
        },

        post: {
          connect: { id: post.id }
        }

      }
    });


    res.status(201).json({ message: 'Comment posted successfully.'})

  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: req.params.postId  
      },
      include: {
        user: true
      }
    });

    
    res.status(200).json({ comments })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }

}