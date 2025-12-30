import { Router } from 'express'
import { upload } from '../../lib/file-upload';
import { claimItem, confirmItem, getClaimedItems, getMyClaimedItems, getTotalClaimsCount, unclaimItem } from './claims.controller';


const router = Router();
router.post('/', upload.single('image'), claimItem);
router.get('/my-claimed-items', getMyClaimedItems);
router.get('/claimed-items', getClaimedItems);
router.post('/unclaim', unclaimItem);
router.get('/count/total-claims', getTotalClaimsCount);
router.post('/confirm/:id', confirmItem);

export default router;