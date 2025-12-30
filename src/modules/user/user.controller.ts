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
    const { department, moreInfo, fbLink, yearLevel } = req.body;

    const profilePicture = req.file;

    const userId = (req as any).user.id;
    console.log(userId);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // TODO: update or create user profile

    // await prisma.profile.create({
    //   data: {
    //     profilePicture: profilePicture ? profilePicture.filename : undefined,
    //     department: department ?? undefined,
    //     moreInfo: moreInfo ?? undefined,
    //     fbLink: fbLink ?? undefined,
    //     yearLevel: yearLevel ?? undefined,
    //     user: {
    //       connect: { id: userId },
    //     },
    //   },
    // });

    await prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          upsert: {
            create: {
              profilePicture: profilePicture ? profilePicture.filename : undefined,
              department: department ?? undefined,
              moreInfo: moreInfo ?? undefined,
              fbLink: fbLink ?? undefined,
              yearLevel: yearLevel ?? undefined,
            },
            update: {
              profilePicture: profilePicture ? profilePicture.filename : undefined,
              department: department ?? undefined,
              moreInfo: moreInfo ?? undefined,
              fbLink: fbLink ?? undefined,
              yearLevel: yearLevel ?? undefined,
            },
          },
        },
      },
    });

    // const profile = await prisma.profile.upsert({
    //   where: {
    //     userId
    //   },
    //   update: {
    //     profilePicture: profilePicture ? profilePicture.filename : undefined,
    //     department: department ?? undefined,
    //     moreInfo: moreInfo ?? undefined,
    //     fbLink: fbLink ?? undefined,
    //     yearLevel: yearLevel ?? undefined,
    //   },
    //   create: {
    //     profilePicture: profilePicture ? profilePicture.filename : undefined,
    //     department: department ?? undefined,
    //     moreInfo: moreInfo ?? undefined,
    //     fbLink: fbLink ?? undefined,
    //     yearLevel: yearLevel ?? undefined,
    //     user: {
    //       connect: { id: userId },
    //     },
    //   },
    // });

    res.status(201).json({ "": "" });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};
