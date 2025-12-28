import { Router } from 'express'
import { getMe } from './user.controller';
const router = Router();


router.get('/getme', getMe);

export default router;