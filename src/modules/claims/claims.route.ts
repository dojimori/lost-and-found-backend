import { Router } from 'express'
import { upload } from '../../lib/file-upload';
import { claimItem, getClaimedItems, getMyClaimedItems, unclaimItem } from './claims.controller';


const router = Router();
router.post('/', upload.single('image'), claimItem);
router.get('/my-claimed-items', getMyClaimedItems);
router.get('/claimed-items', getClaimedItems);
router.post('/unclaim', unclaimItem);

export default router;