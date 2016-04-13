"use strict";
let should = require('should');
let Comment = require('../../Comment/model').Comment;

describe('Comment Model', () => {
  it('Should make message, user and movie required', (done) => {
    let props = Comment.schema.tree;
    props.message.required.should.equal(true);
    props.user.required.should.equal(true);
    props.movie.required.should.equal(true);
    props.user.ref.should.equal('User');
    props.movie.ref.should.equal('Movie');
    done();
  });
});
