import * as mongoose from 'mongoose';
import * as express from 'express';
import {ICommentModel} from './model';

export function controller(comment: mongoose.Model<ICommentModel>){
  return{
    create: create,
    remove: remove
  }

  function create(req:express.Request, res:express.Response, next:Function){
    let c = new comment(req.body);
    c.datePosted = Date.now();
    c.save((err,comment:ICommentModel) => {
      if (err) return next(err);
      res.json(comment);
    });
  }

  function remove(req:express.Request, res:express.Response, next:Function){
    comment.remove({_id:req.params.id},(err) => {
      if (err) return next(err);
      res.json({message: 'This comment has been deleted!'});
    });
  }

}
