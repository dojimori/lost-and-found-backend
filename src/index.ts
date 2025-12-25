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





app.listen(PORT, () => {
    console.log(`listening now on http://localhost:${PORT}`);
});
