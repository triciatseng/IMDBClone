import * as mongoose from 'mongoose';
import * as express from 'express';
import {ICommentModel} from './model';

export function controller(comment: mongoose.Model<ICommentModel>){
  return{
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    remove: remove
  }

  function getAll(req:express.Request, res:express.Response, next:Function){
    comment.find({})
      .populate('name','message')
      .exec((err,comments) => {
        if (err) return next(err);
        res.json(comments);
      });
  }

  function getOne(req:express.Request, res:express.Response, next:Function){
    comment.findOne({_id:req.params.id})
      .populate('name','message')
      .exec((err,data) => {
        if (err) return next(err);
        res.json(data);
      });
  }

  function create(req:express.Request, res:express.Response, next:Function){
    let c = new comment(req.body);
    c.save((err,comment:ICommentModel) => {
      if (err) return next(err);
      res.json(comment);
    });
  }

  function update(req:express.Request, res:express.Response, next:Function){
    comment.update({_id:req.params.id},req.body,(err,numRows) => {
      if (err) return next(err);
      res.json({message: 'This comment has been updated!'});
    });
  }

  function remove(req:express.Request, res:express.Response, next:Function){
    comment.remove({_id:req.params.id},(err) => {
      if (err) return next(err);
      res.json({message: 'This comment has been deleted!'});
    });
  }

}
