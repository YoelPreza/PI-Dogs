/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);


describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  describe('/dogs', () => {
    it('GET response with status 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('/dogs/:id', ()=> {
    it('GET : status 200 if dog has been founded',  ()=> {
      return agent 
        .get('/dogs/8') 
        .expect((res)=>{
          expect(res.status).equal(200)}); 
        })
})
describe('/temperaments', ()=> {
  it('GET sends status 200 when finding temperaments', ()=> {
    return agent 
      .get('/temperaments') 
      .expect((res)=>{
        expect(res.status).equal(200)}); 
      })
})})
