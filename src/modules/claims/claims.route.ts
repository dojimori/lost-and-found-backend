import { Router } from 'express'
import { upload } from '../../lib/file-upload';
import { claimItem } from './claims.controller';


const router = Router();
router.post('/', upload.single('image'), claimItem);

export default router;