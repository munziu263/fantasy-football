import request from "supertest";
import app from "./app";

describe("Test the api root", () => {
  test("It should successfully get the data", async () => {
    return request(app)
      .get("/api")
      .then((response: request.Response) =>
        expect(response.statusCode).toBe(200)
      );
  });
});

describe("Test the player route", () => {
  test("It should successfully get the data", () => {
    return request(app)
      .get("/api/player-history/1")
      .then((response: request.Response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
