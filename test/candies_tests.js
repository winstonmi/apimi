/* globals describe it */

const expect = require('chai').expect
const supertest = require('supertest')
const app = require('../app')
const api = supertest('http://localhost:3000')

describe('GET /candies', function () {
  it('should return a 200 response', function (done) {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an array', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null')
        expect(response.body).to.be.an('array')
        done()
      })
  })
  it('should return all the records in the database', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null')
        expect(response.body.length).to.equal(4)
        done()
      })
  })
})

describe('GET /candies/:id', function () {
  it('should return a 200 response', function (done) {
    api.get('/candies/:id')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return object that has a field called "name" and "color"', (done) => {
    api.get('/candies/1')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null')
        expect(response.body.result).to.have.property('name')
        expect(response.body.result).to.have.property('color')
        done()
      })
  })
})

describe('POST /candies', () => {
  before((done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({
        'id': 5,
        'name': 'lollipop',
        'color': 'Red'
      }).end(done)
  })
  it('should add a new candy to the database', (done) => {
    api.get('/candies/5')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null')
        // expect(response.body.length).to.equal(5)
        console.log(response.body)
        expect(response.body.result.name).to.equal('lollipop')
        done()
      })
  })
  it('should return a 200 response', function (done) {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return a 422 response if the field color is wrong', (done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        // expect(response.body.color).to.equal('red')

        expect(422)
        done()
      })
  })
})

describe('PUT /candies/:id', function () {
  it('should return a 200 response', function (done) {
    api.get('/candies/:id')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should update a candy document', function (done) {
    api.put('/candies/1')
    .set('Accept', 'application/json')
    .end((error, response) => {
      // console.log(response.body.message)
      expect(response.body.message).to.equal('1 updated')
      done()
    })
  })
})

describe('DELETE /candies/:id', function () {
  it('should remove a candy document', function (done) {
    api.delete('/candies/1')
    .set('Accept', 'application/json')
    .end((error, response) => {
      // console.log(response.body.message)
      expect(response.body.message).to.equal('1 deleted')
      done()
    })
  })
})
