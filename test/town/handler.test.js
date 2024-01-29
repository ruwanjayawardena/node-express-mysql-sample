const request = require('supertest');
const express = require('express');
const router = require('../../src/routes/town.routes.js');

const app = new express();
router(app);

describe("Town API Test with Routes", () => {

    test("Get All Towns", async () => {
        const res = await request(app).get('/town');
        expect(res.header['content-type']).toMatch(/json/);
        console.log('Results :: ', res._body);
        expect(res.statusCode).toBe(200);
    });
});