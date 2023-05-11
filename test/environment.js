require('dotenv').config()
const app = require('../src/server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
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

  beforeEach( async () => {
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

    // Create environment
    const environment = {
      name: "lakes"
    }
    const environmentRes = await chai.request(app).post("/fish/freshwater/environments").set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey}).send(environment)
    environmentId = environmentRes.body._id

    // Create fish
    const fish = {
      name: "fishyfish",
      scientificName: "scientificFish",
      image: "imageOfFish.jpg",
      family: familyId,
      environment: [environmentId],
      diet: ["insects", "fish", "shellfish"]
    }

    const fishRes = await chai.request(app).post('/fish/freshwater').set({"Authorization": `Bearer: ${token}`, "x-api-key": apiKey}).send(fish)
    fishId = fishRes.body._id
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
})
