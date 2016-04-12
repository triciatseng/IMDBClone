'use strict';
let should = require('should');
let controller = require('../../Movie/controller');
let Movie = require('../../Movie/model').Movie;
let Comment = require('../../Comment/model').Comment;
let sinon = require('sinon');
require('sinon-as-promised');
require('sinon-mongoose');

let MovieMock, CommentMock;
beforeEach((done) => {
  MovieMock = sinon.mock(Movie);
  CommentMock = sinon.mock(Comment);
  done();
});
afterEach((done) => {
  MovieMock.restore();
  CommentMock.restore();
  done();
});


describe('controller', () => {
  describe('getAll()', () => {
    it('Should return an array of 3', (done) => {
      
    })
  })
})
