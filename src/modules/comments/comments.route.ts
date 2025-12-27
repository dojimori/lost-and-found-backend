import { Router } from "express";
import { index, getComments } from './comments.controller'

const router = Router();


router.post('/', index);
router.get('/:postId', getComments)

export default router;