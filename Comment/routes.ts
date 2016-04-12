import * as express from 'express';
import * as jwt from 'express-jwt';
import * as controller from './controller';

const router = express.Router();
const auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

//BASE ROUTE: '/api/v1/comments'

//POST: '/api/v1/comments'
router.post('/', auth, controller.create);

//DELETE: '/api/v1/comments/:id'
router.delete('/:id', auth, controller.remove);

export = router;
