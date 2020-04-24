const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("auth router", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /register", () => {
    it("should return status of 201", async () => {
      let res = await request(server)
        .post("/api/auth/register")
        .send({ username: "duke", password: "silver" });
      expect(res.status).toBe(201);
    });

    it("should return an object containing the new user information", async () => {
      let res = await request(server)
        .post("/api/auth/register")
        .send({ username: "duke", password: "silver" });
      expect(res.body[0].username).toBe("duke");
    });
  });
});
