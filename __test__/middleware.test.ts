import request from "supertest";
import express from "express";
import middleware from "../src/middlewares";
import routes from "../src/routes";

const app = express();

let server: any;

beforeAll((done) => {
  middleware(app);
  routes(app);
  server = app.listen(0);
  done();
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoint Tests", () => {
  it("should return a 401 status code for the /api/txs/unconfirmed endpoint", async () => {
    const response = await request(app).get("/api/txs/unconfirmed");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("No token, authorization denied");
  });

  it("should return a 401 status code for the /api/txs/unconfirmed endpoint", async () => {
    const response = await request(app)
      .get("/api/txs/unconfirmed")
      .set({ "x-auth-token": "invalid" });
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Token is not valid");
  });
});
