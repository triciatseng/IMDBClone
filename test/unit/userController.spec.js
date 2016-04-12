"use strict";
let should = require('Should');
let controller = require('../../User/controller');
let User = require('../../User/model').User;
let sinon = require('sinon');
require('sinon-as-promised');
require('sinon-mongoose');

let UserMock;
beforeEach((done) => {
  UserMock = sinon.mock(User);
  done();
});
afterEach((done) => {
  UserMock.restore();
  done();
});

describe('controller', () =>{
    describe('login()'), () => {
        it('Should find one user by email, compare the password, then generate token', done() => {
            UserMock.expects('findOne').withArgs({
                email: 'test@test.com'
            })
            .chain('exec').yields(null, {
                email: 'test@test.com',
                user: ('comparePassword').withArgs({
                    password: 'turtle'
                }).yields(null, true);
            });
            let req = {
                body: {
                    email: 'test@test.com',
                    password: 'turtle'
                }
            }
        })
    }
})
