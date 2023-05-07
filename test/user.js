const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, after } = require('mocha');
const app = require('../src/server');

const should = chai.should();

chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(app);

const User = require('../src/models/user');

describe('User', function () {
  const newUser = {
    username: 'testone',
    password: 'password',
    email: 'test@email.com'
  }

  it('should not be able to retrieve token/apiKey if they have not registered', function (done) {
    agent.post('/user/auth', { email: 'wrong@example.com', password: 'nope' }).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });

  // register
  it('should be able to register', function (done) {
    User.findOneAndRemove({ username: 'testone' })
      .then(() => {
        agent
          .post('/user/register')
          .send(newUser)
          .end(function (err, res) {
            res.should.have.status(200);
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });

  // auth
  it('should be able to login', function (done) {
    agent
      .post('/user/auth')
      .send({ username: 'testone', password: 'password', email: 'test@email.com' })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

});
