import { Router } from 'express'
import { getMe, updateProfile } from './user.controller';
import { upload } from '../../lib/file-upload';

const router = Router();

router.get('/getme', getMe);
router.post('/update-profile', upload.single('profilePicture'),  updateProfile);

export default router;