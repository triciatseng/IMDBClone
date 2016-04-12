import * as express from 'express';
import { controller } from './controller';
import { User } from './model';

const router = express.Router();
const ctrl = controller(User);

router.post('/login', ctrl.login);

router.post('/register', ctrl.register);

export = router;
