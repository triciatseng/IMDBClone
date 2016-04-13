import * as mongoose from 'mongoose';

export interface IMovieModel extends app.i.IMovie, mongoose.Document{}

let movieSchema = new mongoose.Schema({
  title: {type: String, required: true},
  director: {type: String, required: true},
  imgURL: {type: String, required: true},
  rating: {type: Number, default: 0},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

export let Movie = mongoose.model<IMovieModel>('Movie',movieSchema);
