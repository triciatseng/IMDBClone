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
      MovieMock.expects('find').withArgs({})
      .chain('populate', 'user', 'name')
      .chain('exec')
      .yields(null, [1, 2, 3]);

      let req = {};
      let res = {
        json: function(data){
          MovieMock.verify();
          data.should.be.an.instanceOf(Array);
          data.length.should.equal(3);
          done();
        }
      }
      let next = function() {
        throw new Error('Threw this ish, when it should not have!');
      };
      controller.getAll(req, res, next);
    });

    it('Should throw an error and call next', (done) => {
      MovieMock.expects('find').withArgs({})
      .chain('populate', 'user', 'name')
      .chain('exec')
      .yields('Whoops! Sorry mate!')

      let req = {};
      let res = {
        json: function() {
          throw new Error('Called res.json when it shouldnt have!');
        }
      };
      let next = function(err) {
        err.should.equal('Whoops! Sorry mate!', null);
        MovieMock.verify();
        done();
      }
      controller.getAll(req, res, next);
    });
  })
  describe('getOne', () => {
    it('Should return an object by a specific id', (done) => {
      MovieMock.expects('findOne').withArgs({
        _id: 4
      })
      .chain('populate', 'user', 'name')
      .chain('populate', 'comments', '-movie')
      .chain('exec')
      .yields(null, {
        comments: 7
      });

      CommentMock.expects('populate')
      .withArgs(7, {
        path: 'user',
        select: 'name',
        model: 'User'
      })
      .yields(null, 3);

      let req = {
        params: {
          id: 4
        }
      }
      let res = {
        json: function(data) {
          data.comments.should.equal(7);
          MovieMock.verify();
          CommentMock.verify();
          done();
        }
      };
      let next = function() {
        throw new Error('Next was thrown when it shouldnt have!')
      };

      controller.getOne(req, res, next);
    })
    it('Should return next with an error', (done) => {
      MovieMock.expects('findOne')
      .chain('populate', 'user', 'name')
      .chain('populate', 'comments', '-movie')
      .chain('exec')
      .yields('To err(or) is human')

      let req = {
        params: {}
      };
      let res = {
        json: function() {
          throw new Error('Called JSON when he was supposed to be sleeping!')
        }
      };
      let next = function(err) {
        err.should.equal('To err(or) is human');
        MovieMock.verify();
        done();
      };
      controller.getOne(req, res, next);
    });
    it('Should handle an error from Comment.populate', (done) => {
      MovieMock.expects('findOne')
      .chain('populate')
      .chain('populate')
      .chain('exec')
      .yields(null, {
        comments: 7
      });

      CommentMock.expects('populate')
      .withArgs(7, {
        path: 'user',
        select: 'name',
        model: 'User'
      })
      .yields('Err!');

      let req = {
        params: {
          id: 5
        }
      };
      let res = {
        json: function() {
          throw new Error('JSON was supposed to be sleeping!')
        }
      };
      let next = function(err) {
        err.should.equal('Err!')
        MovieMock.verify();
        CommentMock.verify();
        done();
      };
      controller.getOne(req, res, next);
    });
  });

  describe('create()', () => {
    let createStub;
    beforeEach((done) => {
      createStub = sinon.stub(Movie, 'create');
      done();
    });
    afterEach((done) => {
      createStub.restore();
      done();
    });

    it('Should save req body and return new obj', (done) => {
      createStub.yields(null, 'abc');

      let req = {
        body: {
          title: 'test',
          director: 'linklater',
          imgURL: 'http://anyUrl.com'
        },
        payload: {
          _id: 6
        }
      };
      let res = {
        json: function(data) {
          data.should.equal('abc');
          let m = create.getCalls()[0].args[0];
          m.user.should.equal(6);
          m.title.should.equal('test');
          m.director.should.equal('linklater');
          m.imgUrl.should.equal(true);
          should.exist(m.datePosted);
          done();
        }
      };
      let next = function(err) {
        throw new Error(err)
      };
      controller.create(req, res, next);
    });

    it('Should call the next function with the error in the params', (done) => {
      create.yields("WHOOOOOOOOOOPZZZ!");

      let req = {
        body: {},
        payload: {}
      };
      let res = {
        json: function() {
          throw new Error('JSON WANTED SLEEP!')
        }
      };
      let next = function(error) {
        error.should.equal("WHOOOOOOOOOOPZZZ!");
        done();
      };
      controller.create(req, res, next);
    });

  })
  })
