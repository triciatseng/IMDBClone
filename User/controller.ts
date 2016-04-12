import * as express from 'express';
import * as mongoose from 'mongoose';
import { User, IUserModel } from './model';


    export function login(req: express.Request, res: express.Response, next: Function){
        if(!req.body.email) return next({message: 'An email is required to login, dummy.'});
        if(!req.body.password) return next({message: "Go home, you're drunk."});

        User.findOne({email: req.body.email})
            .exec((err, user) => {
                if (err) return next (err);
                if(!user) return next ({message: 'Invalid Username/Password combo... or something.'});
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if(err) return next(err);
                    if(!isMatch) return next({message: 'Invalid Username/Password combo bruh.'});
                    else res.json({token: user.generateJWT() });
                });
            });
    }

    export function register(req: express.Request, res: express.Response, next: Function){
        let u = new User(req.body);
        u.hashPassword(req.body.password, (err, hash) => {
            if (err) return next (err);
            u.password = hash;
            u.save((err, user: IUserModel) => {
                res.json({token: user.generateJWT() });
            });
        });
    }
