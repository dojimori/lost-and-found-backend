import { Router } from 'express'
import { upload } from '../../lib/file-upload';
import { claimItem, getMyClaimedItems } from './claims.controller';


const router = Router();
router.post('/', upload.single('image'), claimItem);
router.get('/my-claimed-items', getMyClaimedItems);

export default router;