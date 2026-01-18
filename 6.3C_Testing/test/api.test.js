const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');

describe('POST /api/math/average', () => {

  it('should return average for valid input', async () => {
    const res = await request(app)
      .post('/api/math/average')
      .send({ numbers: [10, 20] });

    expect(res.status).to.equal(200);
    expect(res.body.average).to.equal(15);
  });

  it('should return error for invalid input', async () => {
    const res = await request(app)
      .post('/api/math/average')
      .send({ numbers: [] });

    expect(res.status).to.equal(400);
  });

});
