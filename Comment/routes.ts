import * as express from 'express';
import * as jwt from 'express-jwt';
import {Comment} from './model';
import {Movie} from '../Movie/model'
import {controller} from './controller';

const router = express.Router();
const ctrl = controller(Comment, Movie);
const auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

//BASE ROUTE: '/api/v1/comments'

//POST: '/api/v1/comments'
router.post('/', auth, ctrl.create);

//DELETE: '/api/v1/comments/:id'
router.delete('/:id', auth, ctrl.remove);

export = router;
