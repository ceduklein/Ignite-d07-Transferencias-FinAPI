import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";

import createDbConnection from "../../../../database";

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createDbConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "User test",
      email: "test@email.com",
      password: "test"
    });
    expect(response.status).toBe(201);
  });

  it("should not be able to create a new user when email has already been registered", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "User test",
      email: "test@email.com",
      password: "test"
    });
    expect(response.status).toBe(400);
  })
})
