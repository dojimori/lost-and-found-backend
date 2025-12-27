import { Router } from 'express'
import { upload } from '../../lib/file-upload';
import { claimItem, getMyClaimedItems, unclaimItem } from './claims.controller';


const router = Router();
router.post('/', upload.single('image'), claimItem);
router.get('/my-claimed-items', getMyClaimedItems);
router.post('/unclaim', unclaimItem);

export default router;