import { Router } from "express";
import { postComment, getComments } from './comments.controller'

const router = Router();


router.post('/', postComment);
router.get('/:postId', getComments)

export default router;