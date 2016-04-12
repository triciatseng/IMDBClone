import * as mongoose from 'mongoose';
import * as express from 'express';
import {Movie, IMovieModel} from './model';
import {Comment, ICommentModel} from '../Comment/model';

  export function getAll(req:express.Request, res:express.Response, next:Function){
    Movie.find({})
      .populate('user','name')
      .exec((err,movies) => {
        if (err) return next(err);
        res.json(movies);
      });
  }

  export function getOne(req:express.Request, res:express.Response, next:Function){
    Movie.findOne({_id:req.params.id})
      .populate('user','name')
      .populate('comments','-movie')
      .exec((err,data) => {
        if (err) return next(err);
        Comment.populate(data.comments,{path:'user',select:'name',model:'User'}, (err, response) => {
          if (err) return next(err);
          res.json(data);
        });
      });
  }

  export function create(req:express.Request, res:express.Response, next:Function){
    let m = new Movie(req.body);
    m.user = req['payload']._id;
    m.save((err,movie:IMovieModel) => {
      if (err) return next(err);
      res.json(movie);
    });
  }

  export function update(req:express.Request, res:express.Response, next:Function){
    Movie.update({_id:req.params.id, user:req['payload']._id},req.body,(err,numRows:any) => {
      if (err) return next(err);
      if (numRows === 0) return next({message:'Unable to update movie entry!', status: 500});
      res.json({message:'This movie entry has been updated!'});
    })
  }

  export function remove(req:express.Request, res:express.Response, next:Function){
    Movie.findOneAndRemove({_id:req.params.id, user:req['payload']._id},(err,movie) => {
      if (err) return next(err);
      if (movie) {
          Comment.remove({movie:req.params.id}, (err) => {
            if (err) return next(err);
            res.json({message:'This movie entry has been deleted!'});
          });
      } else {
        next({message:'Unable to delete movie entry.', status: 500});
      }
    });
  }
