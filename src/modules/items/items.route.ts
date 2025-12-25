import { Router } from 'express'
import { getItems, storeItem } from './items.controller';
import { upload } from '../../lib/file-upload';
import { authMiddleware } from '../../middlewares/auth';
const router = Router();



router.get('/', getItems);
router.post('/', upload.single('image'), storeItem);

export default router;