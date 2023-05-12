require('dotenv').config()
const app = require('../src/server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const Environment = require('../src/models/environment.js')
const Fish = require('../src/models/fish.js')
const Family = require('../src/models/family.js')
const User = require('../src/models/user.js')
const assert = chai.assert

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)


describe('Fish Environment API endpoints', () => {
  let token;
  let apiKey;
  let fishId;
  let familyId;
  let environmentId;

  before( async () => {
    // Create user
    const user = {
      username: "usertest",
      password: "passwordtest",
      email: "test@email.com"
    }
    const testUser = await chai.request(app).post('/user/register').send(user);
    apiKey = testUser.body.apiKey

    const userAuth = await chai.request(app).post('/user/auth').send(user);
    token = userAuth.body.token

    // Create environment
    const environment = {
      name: "lakes"
    }
    const environmentRes = await chai.request(app).post("/fish/freshwater/environments").set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey}).send(environment)
    environmentId = environmentRes.body._id
  })

  after( async () => {
    await User.deleteOne({ username: "usertest" })
    await Environment.deleteOne({ name: "lakes" })
    await Environment.deleteOne({ name: "pond" })
  })

  it('should fail to access API without token', (done) => {
    chai
      .request(app)
      .get('/fish/freshwater/families')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.an('string');
        expect(res.body.message).to.equal('Not authorized. No bearer token in header.')
        done();
      });
  });

  it('should return an array of all environments', (done) => {
    chai
      .request(app)
      .get('/fish/freshwater/environments')
      .set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey})
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.environments).to.be.an('array')
        done()
      })
  });

  it('should return a single environment', (done) => {
    chai
      .request(app)
      .get(`/fish/freshwater/environments/${environmentId}`)
      .set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey})
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body.environment.name).to.equal('lakes')
        done()
      })
  });

  it('should create a environment', (done) => {
    const newEnv = {
      name: "ponds"
    }
    chai
      .request(app)
      .post('/fish/freshwater/environments/')
      .set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey})
      .send(newEnv)
      .end((err, res) => {
        if (err) { done(err) }
        expect(res).to.have.status(201)
        expect(res.body.name).to.equal("ponds")
        done()
      })
  })

  it('should update an environment', (done) => {
    chai
      .request(app)
      .put(`/fish/freshwater/environments/${environmentId}`)
      .set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey})
      .send({ name: "streamyboy"})
      .then((res) => {
        expect(res).to.have.status(200)
        Environment.findById(environmentId)
          .then((updatedEnvironment) => {
            expect(updatedEnvironment.name).to.equal("streamyboy")
            done()
          });
      });
  });

  it('should delete an environment', (done) => {
    chai
      .request(app)
      .delete(`/fish/freshwater/environments/${environmentId}`)
      .set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey})
      .end((err, res) => {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        expect(res.body.message).to.equal("Deleted successfully.")
        done()
      });
  });
})
