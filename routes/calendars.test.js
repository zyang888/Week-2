const request = require("supertest");

const server = require("../server");
const testUtils = require("../test-utils");

describe("/calendars", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  describe("GET /:id", () => {
    it("should return 404 if no matching id", async () => {
      const res = await request(server).get("/calendars/id1");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("POST /", () => {
    it("should return a 400 without a provided name", async () => {
      const res = await request(server).post("/calendars/").send({});
      expect(res.statusCode).toEqual(400);
    });
  });

  describe("GET /:id after multiple POST /", () => {
    let calendar1, calendar2;

    beforeEach(async () => {
      calendar1 = (
        await request(server).post("/calendars").send({ name: "calendar1" })
      ).body;
      calendar2 = (
        await request(server).post("/calendars").send({ name: "calendar2" })
      ).body;
    });

    it("should return calendar1 using its id", async () => {
      const res = await request(server).get("/calendars/" + calendar1._id);
      expect(res.statusCode).toEqual(200);
      const storedCalendar = res.body;
      expect(storedCalendar).toMatchObject({
        name: "calendar1",
        _id: calendar1._id,
      });
    });

    it("should return calendar2 using its id", async () => {
      const res = await request(server).get("/calendars/" + calendar2._id);
      expect(res.statusCode).toEqual(200);
      const storedCalendar = res.body;
      expect(storedCalendar).toMatchObject({
        name: "calendar2",
        _id: calendar2._id,
      });
    });
  });

  describe("GET / after multiple POST /", () => {
    let calendar1, calendar2;

    beforeEach(async () => {
      calendar1 = (
        await request(server).post("/calendars").send({ name: "calendar1" })
      ).body;
      calendar2 = (
        await request(server).post("/calendars").send({ name: "calendar2" })
      ).body;
    });

    it("should return all calendars", async () => {
      const res = await request(server).get("/calendars/");
      expect(res.statusCode).toEqual(200);
      const storedCalendars = res.body;
      expect(storedCalendars).toMatchObject([calendar1, calendar2]);
    });
  });

  describe("PUT /:id after POST /", () => {
    let calendar1;

    beforeEach(async () => {
      calendar1 = (
        await request(server).post("/calendars").send({ name: "calendar1" })
      ).body;
    });

    it("should store and return calendar1 with new name", async () => {
      const res = await request(server)
        .put("/calendars/" + calendar1._id)
        .send({ name: "new name" });
      expect(res.statusCode).toEqual(200);

      const storedCalendar = (
        await request(server).get("/calendars/" + calendar1._id)
      ).body;
      expect(storedCalendar).toMatchObject({
        name: "new name",
        _id: calendar1._id,
      });
    });
  });

  describe("DELETE /:id after POST /", () => {
    let calendar1;

    beforeEach(async () => {
      calendar1 = (
        await request(server).post("/calendars").send({ name: "calendar1" })
      ).body;
    });

    it("should delete and not return calendar1 on next GET", async () => {
      const res = await request(server).delete("/calendars/" + calendar1._id);
      expect(res.statusCode).toEqual(200);
      const storedCalendarResponse = await request(server).get(
        "/calendars/" + calendar1._id
      );
      expect(storedCalendarResponse.status).toEqual(404);
    });
  });
});

// ****************************************
describe("/calendars/events", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  describe("POST /:id/events", () => {
    it("should return a 400 without a provided name", async () => {
      const res = await request(server).post("/calendars/id1/events").send({});
      expect(res.statusCode).toEqual(400);
    });
  });

  describe("GET /:id/events/:id", () => {
    it("should return 404 if no matching id", async () => {
      const res = await request(server).get("/calendars/id1/events/id1");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("GET /:id/events/:id", () => {
    let event1;
    beforeEach(async () => {
      event1 = (
        await request(server)
          .post("/calendars")
          .send({ name: "event1", date: Date(1995, 11, 17) })
      ).body;
    });
    it("should return event with provided id", async () => {
      const res = await request(server).get(
        `/calendars/${calendar1._id}/events/${calendar1._id}`
      );
      expect(res.statusCode).toEqual(200);
      const storedCalendar = res.body;
      expect(storedCalendar).toMatchObject({
        name: "calendar1",
        date: Date(1995, 11, 17),
        _id: calendar1._id,
      });
    });
  });

  describe("GET /:id/events", () => {
    let event1, event2;
    beforeEach(async () => {
      event1 = (
        await request(server)
          .post("/calendars")
          .send({ name: "event1", date: Date(1995, 5, 19) })
      ).body;
      event2 = (
        await request(server)
          .post("/calendars")
          .send({ name: "event2", date: Date(2020, 5, 19) })
      ).body;
    });

    it("should return an array for all the events for the specified calendar", async () => {
      const res = await request(server).get("/calendars/" + calendar1._id);
      expect(res.statusCode).toEqual(200);
      const storedCalendar = res.body;
      expect(storedCalendar).toMatchObject({
        name: "calendar1",
        _id: calendar1._id,
      });
    });
  });

  describe("GET / after multiple POST /", () => {
    let calendar1, calendar2;

    beforeEach(async () => {
      calendar1 = (
        await request(server).post("/calendars").send({ name: "calendar1" })
      ).body;
      calendar2 = (
        await request(server).post("/calendars").send({ name: "calendar2" })
      ).body;
    });

    it("should return all calendars", async () => {
      const res = await request(server).get("/calendars/");
      expect(res.statusCode).toEqual(200);
      const storedCalendars = res.body;
      expect(storedCalendars).toMatchObject([calendar1, calendar2]);
    });
  });

  describe("PUT /:id after POST /", () => {
    let calendar1;

    beforeEach(async () => {
      calendar1 = (
        await request(server).post("/calendars").send({ name: "calendar1" })
      ).body;
    });

    it("should store and return calendar1 with new name", async () => {
      const res = await request(server)
        .put("/calendars/" + calendar1._id)
        .send({ name: "new name" });
      expect(res.statusCode).toEqual(200);

      const storedCalendar = (
        await request(server).get("/calendars/" + calendar1._id)
      ).body;
      expect(storedCalendar).toMatchObject({
        name: "new name",
        _id: calendar1._id,
      });
    });
  });

  describe("DELETE /:id after POST /", () => {
    let calendar1;

    beforeEach(async () => {
      calendar1 = (
        await request(server).post("/calendars").send({ name: "calendar1" })
      ).body;
    });

    it("should delete and not return calendar1 on next GET", async () => {
      const res = await request(server).delete("/calendars/" + calendar1._id);
      expect(res.statusCode).toEqual(200);
      const storedCalendarResponse = await request(server).get(
        "/calendars/" + calendar1._id
      );
      expect(storedCalendarResponse.status).toEqual(404);
    });
  });
});
