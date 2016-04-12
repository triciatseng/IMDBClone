import * as express from 'express';
import {Movie} from './model';
import {controller} from './controller';

const router = express.Router();
const ctrl = controller(Movie);

//BASE ROUTE: '/api/v1/movies'

//GET: '/api/v1/movies'
router.get('/',ctrl.getAll);

//GET: '/api/v1/movies/:id'
router.get('/:id',ctrl.getOne);

//POST: '/api/v1/movies'
router.post('/',ctrl.create);

//PUT: '/api/v1/movies/:id'
router.put('/:id',ctrl.update);

//DELETE: '/api/v1/movies/:id'
router.delete('/:id',ctrl.remove);

export = router;
