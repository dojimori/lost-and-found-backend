import express from "express";
import type { Request, Response, Express } from "express";
import cors from 'cors'
import session from 'express-session'

// Routes
import authRoutes from './modules/auth/auth.route'
import itemsRoute from './modules/items/items.route'
import commentsRoute from './modules/comments/comments.route'
import claimsRoute from './modules/claims/claims.route'
import messagesRoute from './modules/messages/messages.route'
import userRoute from './modules/user/user.route'
// End routes 

// Middlewares 
import { authMiddleware } from "./middlewares/auth";
// End middlewares

const app: Express = express();
const PORT = 3000;

app.use('/public', express.static('uploads'))
app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true
}))

// app.use(session({
//     secret: 'thisisasecret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: false
//     }
// }))


// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', authMiddleware, userRoute)
app.use('/api/items', authMiddleware, itemsRoute)
app.use('/api/comments', authMiddleware, commentsRoute)
app.use('/api/claims', authMiddleware, claimsRoute)
app.use('/api/messages', authMiddleware, messagesRoute)

app.listen(PORT, '10.94.50.70', () => {
    console.log('Backend running at http://10.94.50.70:3000')
    // console.log(`listening now on http://localhost:${PORT}`);
});
