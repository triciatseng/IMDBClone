import * as express from 'express';
import * as jwt from 'express-jwt';
import {Movie} from './model';
import {Comment} from '../Comment/model';
import {controller} from './controller';

const router = express.Router();
const ctrl = controller(Movie,Comment);
const auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

//BASE ROUTE: '/api/v1/movies'

//GET: '/api/v1/movies'
router.get('/',ctrl.getAll);

//GET: '/api/v1/movies/:id'
router.get('/:id',ctrl.getOne);

//POST: '/api/v1/movies'
router.post('/',auth,ctrl.create);

//PUT: '/api/v1/movies/:id'
router.put('/:id',auth,ctrl.update);

//DELETE: '/api/v1/movies/:id'
router.delete('/:id',auth,ctrl.remove);

export = router;
