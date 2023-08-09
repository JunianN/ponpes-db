import express from 'express';
import * as controller from '../controllers/strukturController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', controller.findAll);

router.get('/:id', controller.findById);

router.post('/', 
  // auth.authenticate, 
  // auth.authorizeAdmin, 
  controller.create);

router.put(
  '/:id',
//   auth.authenticate,
//   auth.authorizeAdmin,
  controller.updateById
);

router.delete(
  '/:id',
//   auth.authenticate,
//   auth.authorizeAdmin,
  controller.deleteById
);

export default router;
