import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";

import createDbConnection from "../../../../database";

let connection: Connection;

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    connection = await createDbConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to authenticate a user", async () => {
    const user = await request(app).post("/api/v1/users").send({
      name: "User test",
      email: "test@email.com",
      password: "test"
    });

    const response = await request(app).post("/api/v1/sessions").send({
      email: "test@email.com",
      password: "test"
    });

    expect(response.body).toHaveProperty("token");
  })
})
