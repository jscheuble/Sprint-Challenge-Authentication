const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("jokes router", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("GET /api/jokes", () => {
    it("should run middleware and return a status of 400 if not logged in", async () => {
      let res = await request(server).get("/api/jokes");
      expect(res.status).toBe(400);
    });
  });
});
