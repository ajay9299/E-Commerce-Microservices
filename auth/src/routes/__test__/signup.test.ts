import app from "../../app";
import request from "supertest";

it("returns a 200 on successful signup", async () => {
  return await request(app)
    .post("/v1/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "Test@123",
      firstName: "Test",
      middleName: "Moca",
      lastName: "Jest",
    })
    .expect(200);
});
