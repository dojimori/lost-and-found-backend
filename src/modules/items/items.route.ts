import { Router } from 'express'
import { index, store, show } from './items.controller';
import { upload } from '../../lib/file-upload';
const router = Router();



router.get('/', index);
router.post('/', upload.single('image'), store);
router.get('/:id', show);

export default router;