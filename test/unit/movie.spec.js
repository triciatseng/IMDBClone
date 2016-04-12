"use strict";
let should = require('should');
let Movie = require('../Movie/model').Movie;

describe('Movie Model', () => {
  it('Should make Title, Director and imgURL true', (done) => {
    let props = Movie.schema.tree;
    props.title.required.should.equal(true);
    props.director.required.should.equal(true);
    props.imgURL.required.should.equal(true);
    props.user.required.should.equal(true);
    props.user.ref.should.equal('User');
    done();
  });
  it("Should reference comments correctly", (done) => {
    Movie.schema.tree.comments[0].ref.should.equal('Comment');
    done();
  });
});
