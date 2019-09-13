import app from "../app";
import * as request from "supertest";

describe("GET / - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app).post("/login");
    expect(result.text).toEqual("{\"message\":\"API Working Correctly\"}");
    expect(result.statusCode).toEqual(200);
  });
});