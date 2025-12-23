import express from "express";
import type { Request, Response, Express } from "express";
import { PrismaClient } from '@prisma/client'
const prisma: any = new PrismaClient();
const app: Express = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`listening now on http://localhost:${PORT}`);
});
