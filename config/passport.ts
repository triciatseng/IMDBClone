let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
import {User} from '../User/model';

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id','displayName','email'],
  passReqToCallback: true
}, function(req,accessToken,refreshToken,profile,next){
  User.findOne({'facebook.id': profile.id})
    .exec((err,user) => {
      if (err) return next(err);
      if (user) {
        req['tempUser'] = user;
        next(null,user);
      } else {
        let u = new User();
        u.name = profile.displayName;
        u.facebook.id = profile.id;
        u.facebook.token = accessToken;
        u.save((err,user) => {
          if (err) return next(err);
          req['tempUser'] = user;
          next(null,user);
        });
      }
    });
}));
