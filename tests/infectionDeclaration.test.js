const request = require("supertest");
const app = require("../src/app");
const objects = require("./fixtures/DB");

describe("test infection declaration", () => {
  beforeEach(objects.setupDatabase);

  test("upload infection pets successfully", async () => {
    //registration
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

    //get HA token
    const response3 = await request(app)
      .get("/getNewToken")
      .set("Authorization", `Bearer ${process.env.HEALTH_AUTHORITY_SECRET}`)
      .send()
      .expect(200);

    expect(response3.body.HAToken).not.toBe(undefined);
    const HAToken = response3.body.HAToken;

    // upload infection PETs
    const infectionObject = objects.infecDecObj1;
    infectionObject["healthAuthorityToken"] = HAToken;

    const response4 = await request(app)
      .post("/infectionDeclaration")
      .set("Authorization", `Bearer ${authToken}`)
      .send(infectionObject)
      .expect(201);
  });

  test("upload infection pets without authentication token", async () => {
    // registration
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

    // get HA token
    const response3 = await request(app)
      .get("/getNewToken")
      .set("Authorization", `Bearer ${process.env.HEALTH_AUTHORITY_SECRET}`)
      .send()
      .expect(200);

    expect(response3.body.HAToken).not.toBe(undefined);
    const HAToken = response3.body.HAToken;

    // upload infection PETs
    const infectionObject = objects.infecDecObj1;
    infectionObject["healthAuthorityToken"] = HAToken;

    const response4 = await request(app)
      .post("/infectionDeclaration")
      .send(infectionObject)
      .expect(403);
  });

  test("upload infection pets without Health authority token", async () => {
    // registration
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

    // get HA token
    const response3 = await request(app)
      .get("/getNewToken")
      .set("Authorization", `Bearer ${process.env.HEALTH_AUTHORITY_SECRET}`)
      .send()
      .expect(200);

    expect(response3.body.HAToken).not.toBe(undefined);
    const HAToken = response3.body.HAToken;

    // upload infection PETs
    const infectionObject = objects.infecDecObj1;
    infectionObject["healthAuthorityToken"] = undefined;

    const response4 = await request(app)
      .post("/infectionDeclaration")
      .set("Authorization", `Bearer ${authToken}`)
      .send(infectionObject)
      .expect(400);
  });

  test("upload infection pets with invalid HA token", async () => {
    // registration
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

    // get HA token
    const response3 = await request(app)
      .get("/getNewToken")
      .set("Authorization", `Bearer ${process.env.HEALTH_AUTHORITY_SECRET}`)
      .send()
      .expect(200);

    expect(response3.body.HAToken).not.toBe(undefined);
    const HAToken = response3.body.HAToken;

    // upload infection PETs
    const infectionObject = objects.infecDecObj1;
    infectionObject["healthAuthorityToken"] = "invalid HA Token";

    const response4 = await request(app)
      .post("/infectionDeclaration")
      .set("Authorization", `Bearer ${authToken}`)
      .send(infectionObject)
      .expect(400);
  });
  test("upload infection pets without infection PETs object", async () => {
    // registration
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

    // get HA token
    const response3 = await request(app)
      .get("/getNewToken")
      .set("Authorization", `Bearer ${process.env.HEALTH_AUTHORITY_SECRET}`)
      .send()
      .expect(200);

    expect(response3.body.HAToken).not.toBe(undefined);
    const HAToken = response3.body.HAToken;

    const response4 = await request(app)
      .post("/infectionDeclaration")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(400);
  });
});
