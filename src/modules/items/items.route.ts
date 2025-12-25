import { Router } from 'express'
import { getItems, storeItem } from './items.controller';

const router = Router();
router.get('/items', getItems);
router.post('/items', storeItem);

export default router;