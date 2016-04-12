import * as mongoose from 'mongoose';
import * as express from 'express';
import {ICommentModel} from './model';
import {IMovieModel} from '../Movie/model';

export function controller(Comment: mongoose.Model<ICommentModel>, Movie: mongoose.Model<IMovieModel>){
  return{
    create: create,
    remove: remove
  }

  function create(req:express.Request, res:express.Response, next:Function){
    let c = new Comment(req.body);
    c.datePosted = Date.now();
    c.save((err,comment:ICommentModel) => {
      if (err) return next(err);
      res.json(comment);
    });
  }

  function remove(req:express.Request, res:express.Response, next:Function){
    Comment.remove({_id:req.params.id},(err) => {
      if (err) return next(err);
      // if a comment was found and deleted... update the blog
      if (Comment) {
        Movie.update({ comments: req.params.id }, { $pull: { comments: req.params.id } }, (err, numRows) => {
          if (err) return next(err);
          res.json({ message: "Your comment has been deleted!" });
        });
      // ... otherwise send an error message
      } else {
        next({ message: 'Could not delete the requested comment.', status: 500 });
      }
    });
  }

}
