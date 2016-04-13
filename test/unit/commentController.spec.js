"use strict";
let should = require('Should');
let controller = require('../../Comment/controller');
let Movie = require('../../Movie/model').Movie;
let Comment = require('../../Comment/model').Comment;
let sinon = require('sinon');
require('sinon-as-promised');
require('sinon-mongoose');

describe('Comment Controller', () => {
    let CommentMock, MovieMock;
    beforeEach((done) => {
        CommentMock = sinon.mock(Comment);
        MovieMock = sinon.mock(Movie);
        done();
    });
    afterEach((done) => {
        CommentMock.restore();
        MovieMock.restore();
        done();
    });
    describe('create()', () => {
        let createStub;
        beforeEach((done) => {
            createStub = sinon.stub(Comment, 'create');
            done();
        });
        afterEach((done) => {
            createStub.restore();
            done();
        });

        it('Should add date to comment, and return new comment', (done) => {
            createStub.yields(null, { _id: 2, movie: 3 });
            MovieMock.expects('update').withArgs({ _id: 3 }, { $push: { 'comments': 2 }})
                .yields(null);

            let req = {
                body: { message: 'yo!' },
                payload: { _id: 3 }
            };
            let res = {
                json: function(data) {
                    MovieMock.verify();
                    let c = createStub.getCalls()[0].args[0];
                    c.message.should.equal('yo!');
                    c.user.should.equal(3);
                    should.exist(c.datePosted);

                    data._id.should.equal(2);
                    data.movie.should.equal(3);
                    done();
                }
            };
            let next = function(err) {
                throw new Error(err)
            };
            controller.create(req, res, next);
        });
        it('Should call next for error', (done) => {
            createStub.yields('Error');

            let req = {
                payload: {},
                body: {}
            };
            let res = {json: () => {throw new Error('res.json() was called.')}}
            let next = function(err) {
                err.should.equal('Error');
                done();
            };
            controller.create(req,res,next);
        });
        it('Should throw an error for Movie update', (done) => {
            createStub.yields(null, { _id: 2, movie: 3});

            MovieMock.expects('update')
            .yields("Error")

            let req = {
                body: {},
                payload: {}
            }

            let res = { json: () => { throw new Error('thrown error when shouldnt have')}}

            let next = function(err) {
                err.should.equal('Error');
                done();
            };

            controller.create(req,res,next);
        });
    });
    describe ('remove()', () => {
        it('Should return success', (done) => {
            CommentMock.expects('remove').withArgs({_id: 3})
            .yields(null, {});
            MovieMock.expects('update').withArgs({ comments: 3}, {$pull: {comments: 3}})
            .yields(null);

            let req = {
                params: {id: 3},
                payload: {id: 3}
            };
            let res = {
                json: function(data) {
                    data.message.should.equal('Your comment has been deleted!');
                    MovieMock.verify();
                    CommentMock.verify();
                    done();
                }
            };
            let next = function(err) {
                throw new Error(err)
            };
            controller.remove(req,res,next);
        });
        it('Should throw an error on remove', (done) => {
            CommentMock.expects('remove')
            .yields('Error');

            let req = {
                params: {}
            };
            let res = { json: () => {throw new Error('next was called')}};

            let next = function(err) {
                err.should.equal('Error');
                CommentMock.verify();
                done();
            };
            controller.remove(req,res,next);
        });
        it('Should call next if comment not found', (done) => {
            CommentMock.expects('remove').yields(null);

            let req ={
                params: {}
            };

            let res = { json: () => {throw new Error('next was called')}};

            let next = function(err) {
                CommentMock.verify();
                err.message.should.equal('Could not delete the requested comment.');
                err.status.should.equal(500);
                done();
            };
            controller.remove(req,res,next);
        });
        it('Should throw error on Movie update', (done) =>  {
            CommentMock.expects('remove').yields(null, {});
            MovieMock.expects('update').yields("Error");

            let req = {
                params: {}
            };
            let res = { json: () => { throw new Error('Next was called.')}};

            let next = function(err) {
              err.should.equal('Error');
              CommentMock.verify();
              MovieMock.verify();
              done();
            };

            controller.remove(req, res, next);
        });
    });
});
