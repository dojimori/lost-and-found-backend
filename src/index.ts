import express from "express";
import type { Request, Response, Express } from "express";
import { prisma } from "./lib/prisma";
import multer from 'multer'
import path from 'path'
import cors from 'cors'
import session from 'express-session'
import jwt from 'jsonwebtoken'

// Routes
import authRoutes from './modules/auth/auth.route'
// End routes 

// Middlewares 
import { authMiddleware } from "./middlewares/auth";
// End middlewares

const app: Express = express();
const PORT = 3000;

app.use('/public', express.static('uploads'))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(session({
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false
    }
}))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, uniqueSuffix + ext)
    }
})

const upload = multer({ storage })

// routes
app.use('/api/auth', authRoutes)


app.get('/api/items', authMiddleware, async (req: Request, res: Response) => {
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
})


app.post('/api/items', authMiddleware, upload.single('image'), async (req: Request, res: Response) => {
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
})



app.listen(PORT, () => {
    console.log(`listening now on http://localhost:${PORT}`);
});
