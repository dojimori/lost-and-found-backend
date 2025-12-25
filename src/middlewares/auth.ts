import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const header = req.headers.authorization;
        const token = header?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const decoded = jwt.verify(token, 'secrethehe');
        // console.log(decoded);
        (req as any).user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

}