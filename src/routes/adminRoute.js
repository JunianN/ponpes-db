import express from 'express';
import * as controller from '../controllers/adminController.js';

const router = express.Router();

router.get('/:id', controller.findById);

export default router;
