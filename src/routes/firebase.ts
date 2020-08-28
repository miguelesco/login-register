import express from 'express';
import controller from '../controllers/firebase';

const router = express.Router();

router.post('/register', controller.register);
router.post('/snippet', controller.useSnippet);
router.post('/login', controller.login);

export default router;