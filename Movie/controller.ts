import * as mongoose from 'mongoose';
import * as express from 'express';
import {IMovieModel} from './model';
import {ICommentModel} from '../Comment/model';

export function controller(Movie: mongoose.Model<IMovieModel>,Comment: mongoose.Model<ICommentModel>){
  return{
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    remove: remove
  }

  function getAll(req:express.Request, res:express.Response, next:Function){
    Movie.find({})
      .populate('user','name')
      .exec((err,movies) => {
        if (err) return next(err);
        res.json(movies);
      });
  }

  function getOne(req:express.Request, res:express.Response, next:Function){
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

  function create(req:express.Request, res:express.Response, next:Function){
    let m = new Movie(req.body);
    m.save((err,movie:IMovieModel) => {
      if (err) return next(err);
      res.json(movie);
    });
  }

  function update(req:express.Request, res:express.Response, next:Function){
    Movie.update({_id:req.params.id},req.body,(err,numRows) => {
      if (err) return next(err);
      res.json({message: 'This movie entry has been updated!'});
    });
  }

  function remove(req:express.Request, res:express.Response, next:Function){
    Movie.remove({_id:req.params.id},(err) => {
      if (err) return next(err);
      res.json({message: 'This movie entry has been deleted!'});
    });
  }

}
