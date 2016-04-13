import * as express from 'express';
import * as controller from './controller';
const passport = require('passport');

const router = express.Router();

router.post('/login', controller.login);

router.post('/register', controller.register);

router.get('/auth/facebook',passport.authenticate('facebook',{session:false}));

router.get('/auth/facebook/callback',passport.authenticate('facebook',{session:false}),(req,res,next) => {
  res.redirect('/?code=' + req['tempUser'].generateJWT());
});

export = router;
