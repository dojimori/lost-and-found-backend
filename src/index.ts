import express from "express";
import type { Request, Response, Express } from "express";
import cors from 'cors'
import session from 'express-session'

// Routes
import authRoutes from './modules/auth/auth.route'
import itemsRoute from './modules/items/items.route'
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




// routes
app.use('/api/auth', authRoutes)
app.use('/api/items', itemsRoute)



app.listen(PORT, () => {
    console.log(`listening now on http://localhost:${PORT}`);
});
