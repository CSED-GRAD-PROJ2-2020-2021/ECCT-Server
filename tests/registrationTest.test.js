const request = require("supertest");
const app = require("../src/app");
const objects = require("./fixtures/DB");

describe("test registration phase 1", () => {
  beforeAll(objects.setupDatabase);
  test("initial request", async () => {
    const response = await request(app).post("/registration").send(objects.reg1Object1).expect(200);
  });

  test("resend the request with same phone number", async () => {
    const response = await request(app).post("/registration").send(objects.reg1Object1).expect(403);
  });
  test("initial request for another phone number ", async () => {
    const response = await request(app).post("/registration").send(objects.reg1Object2).expect(200);
    expect(response.headers["authorization"]).not.toBeNull();
  });
});

describe("test registration phase 2", () => {
  beforeEach(objects.setupDatabase);
  test("successful registration of phase 2", async () => {
    const response1 = await request(app)
      .post("/registration")
      .send(objects.reg1Object1)
      .expect(200);
    expect(response1.headers["authorization"]).not.toBeNull();
    const authToken = response1.headers["authorization"].replace("Bearer ", "");

    const response2 = await request(app)
      .post("/regAndAuth")
      .set("Authorization", `Bearer ${authToken}`)
      .send(objects.reg2Object1)
      .expect(201);
  });

  test("wrong pinCode", async () => {
    const response1 = await request(app)
      .post("/registration")
      .send(objects.reg1Object1)
      .expect(200);
    expect(response1.headers["authorization"]).not.toBeNull();
    const authToken = response1.headers["authorization"].replace("Bearer ", "");

    const response2 = await request(app)
      .post("/regAndAuth")
      .set("Authorization", `Bearer ${authToken}`)
      .send(objects.reg2Object2)
      .expect(400);
  });
  test("missing authentication token", async () => {
    const response1 = await request(app)
      .post("/registration")
      .send(objects.reg1Object1)
      .expect(200);
    const response2 = await request(app).post("/regAndAuth").send(objects.reg2Object1).expect(403);
  });

  test("wrong authentication token", async () => {
    const response1 = await request(app)
      .post("/registration")
      .send(objects.reg1Object1)
      .expect(200);
    expect(response1.headers["authorization"]).not.toBeNull();
    const authToken = response1.headers["authorization"].replace("Bearer ", "");

    const response2 = await request(app)
      .post("/regAndAuth")
      .set("Authorization", `wrong authentication token`)
      .send(objects.reg2Object1)
      .expect(403);
  });

  test("resend request of phase 2 after successfully registration", async () => {
    const response1 = await request(app)
      .post("/registration")
      .send(objects.reg1Object1)
      .expect(200);
    expect(response1.headers["authorization"]).not.toBeNull();
    const authToken = response1.headers["authorization"].replace("Bearer ", "");

    const response2 = await request(app)
      .post("/regAndAuth")
      .set("Authorization", `Bearer ${authToken}`)
      .send(objects.reg2Object1)
      .expect(201);

    const response3 = await request(app)
      .post("/regAndAuth")
      .set("Authorization", `Bearer ${authToken}`)
      .send(objects.reg2Object1)
      .expect(400);
  });
});
