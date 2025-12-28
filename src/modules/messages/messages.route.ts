import { Router } from 'express'
import { getMessages, storeMessage } from './messages.controller';
const router = Router();


router.get('/:id', getMessages);
router.post('/', storeMessage);

export default router;