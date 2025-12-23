import express from "express";
import type { Request, Response, Express } from "express";
import { prisma } from "./lib/prisma";
import multer from 'multer'
import path from 'path'
import cors from 'cors'



const app: Express = express();
const PORT = 3000;

app.use(cors())

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


app.get('/api/items', (req: Request, res: Response) => {
    try {
        // res.status(200).json({ tempDB });

        res.status(200).json({});

    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
        console.log(error)
    }
})


app.post('/api/items', upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { itemName, description } = req.body;
        const file = req.file;

        // tempDB.push({
        //     itemName,
        //     description,
        //     itemImage: file?.filename
        // })

        if (!file) {
            return res.status(409).json({ message: 'Image is required' });
        }

        await prisma.lostItem.create({
            data: {
                name: itemName,
                description,
                image: file.filename
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
