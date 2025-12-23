import type { Request, Response } from "express";

export const register = async(req: Request, res: Response) => {
    try {
        // validate 
        const { name, email, password } = req.body;

        

    } catch(error) {
        res.status(500).json(error)
        console.log(error)
    }


} 