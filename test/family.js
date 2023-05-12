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


describe('Fish Family API endpoints', () => {
  let token;
  let apiKey;
  let familyId;

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

    // Create family
    const family = {
      name: "fishyfamily",
      scientificName: "scientificFamily"
    }

    const familyRes = await chai.request(app).post("/fish/freshwater/families").set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey}).send(family)
    familyId = familyRes.body._id
  })

  after( async () => {
    await User.deleteOne({ username: "usertest" })
    await Family.deleteOne({name: "fishyfamily" })
    await Family.deleteOne({name: "fishyFam2" })
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

  it('should return an array of all family', (done) => {
    chai
      .request(app)
      .get('/fish/freshwater/families')
      .set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey})
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.families).to.be.an('array')
        done()
      })
  });

  it('should return a single family', (done) => {
    chai
      .request(app)
      .get(`/fish/freshwater/families/${familyId}`)
      .set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey})
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body.family.name).to.equal('fishyfamily')
        done()
      })
  });

  it('should create a family', (done) => {
    const newFam = {
      name: "fishyFam2",
      scientificName: "scientificFam2"
    }
    chai
      .request(app)
      .post('/fish/freshwater/families/')
      .set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey})
      .send(newFam)
      .end((err, res) => {
        if (err) { done(err) }
        expect(res).to.have.status(201)
        expect(res.body.name).to.equal("fishyFam2")
        done()
      })
  })

  it('should update an families', (done) => {
    chai
      .request(app)
      .put(`/fish/freshwater/families/${familyId}`)
      .set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey})
      .send({ name: "fishfam"})
      .then((res) => {
        expect(res).to.have.status(200)
        Family.findById(familyId)
          .then((updatedFamily) => {
            expect(updatedFamily.name).to.equal("fishfam")
            done()
          });
      });
  });

  it('should delete a fish family', (done) => {
    chai
      .request(app)
      .delete(`/fish/freshwater/families/${familyId}`)
      .set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey})
      .end((err, res) => {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        expect(res.body.message).to.equal("Deleted successfully.")
        done()
      });
  });
})
