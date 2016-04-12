import * as mongoose from 'mongoose';

export interface ICommentModel extends app.i.IComment, mongoose.Document{}

let commentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  message: {type: String, required: true},
  datePosted: {type: Number, required: true},

  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true}
});

export let Comment = mongoose.model<ICommentModel>('Comment', commentSchema);
