import * as mongoose from 'mongoose';
import * as express from 'express';
import {Comment, ICommentModel} from './model';
import {Movie, IMovieModel} from '../Movie/model';

export function create(req: express.Request, res: express.Response, next: Function) {
    let c = new Comment(req.body);
    c.datePosted = Date.now();
    c.user = req['payload']._id;
    c.save((err, comment) => {
        if (err) return next(err);
        Movie.update({ _id: c.movie }, { $push: { 'comments': c._id } }, (err, result) => {
            if (err) return next(err);
            res.json(c);
        });
    });
}

 export function remove(req:express.Request, res:express.Response, next:Function){
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
