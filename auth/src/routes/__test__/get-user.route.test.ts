import app from "../../app";
import request from "supertest";

/** Success response (200) on valid userId (ObjectId) */
it("returns 200 if user info present", async () => {
  return await request(app)
    .get("/v1/auth/userDetails/647da30f54fd0f850fab8335")
    .expect(200);
});

/** BadRequest response (200) on valid userId (ObjectId) */
it("returns 200 if user info present", async () => {
  return await request(app).get("/v1/auth/userDetails/axy").expect(400);
});
