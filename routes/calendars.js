const { Router } = require("express");
const router = Router();

const CalendarDAO = require("../daos/calendars");

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send('body parameter "name" is required"');
  } else {
    const calendar = await CalendarDAO.create(name);
    res.json(calendar);
  }
});

router.get("/:id", async (req, res, next) => {
  const calendar = await CalendarDAO.getById(req.params.id);
  if (calendar) {
    res.json(calendar);
  } else {
    res.sendStatus(404);
  }
});

router.get("/", async (req, res, next) => {
  const calendar = await CalendarDAO.getAll();
  if (calendar) {
    res.json(calendar);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:id", async (req, res, next) => {
  const { name } = req.body;
  await CalendarDAO.put(req.params.id, name);
  res.sendStatus(200);
});

router.delete("/:id", async (req, res, next) => {
  await CalendarDAO.delete(req.params.id);
  res.sendStatus(200);
});

// **************************
// POST /calendars/:id/events - creates an event for the specified calendar using JSON from the request body
router.post("/:id/events", async (req, res, next) => {
  const { name, date } = req.body;
  if (!name || !date) {
    res.status(400).send('body parameter "name" and "date" are required"');
  } else {
    const event0 = await CalendarDAO.createEvent(req.params.id, name, date);
    res.json(event0);
  }
});

// GET /calendars/:id/events/:id - returns event with provided id from specified calendar
router.get("/:calendar_id/events/:event_id", async (req, res, next) => {
  const event0 = await CalendarDAO.getEventById(
    req.params.calendar_id,
    req.params.event_id
  );
  if (event0) {
    res.json(event0);
  } else {
    res.sendStatus(404);
  }
});

// GET /calendars/:id/events - get an array for all the events for the specified calendar
// Optional query parameters from and to to specify start and end dates, inclusively, that the returned events should be contained within
router.get("/:id/events", async (req, res, next) => {
  const event0 = await CalendarDAO.getAllEvents(req.params.id);
  if (event0) {
    res.json(event0);
  } else {
    res.sendStatus(404);
  }
});

// PUT /calendars/:id/events/:id - updates event with provided id from specified calendar to have data from request body
router.put("/:calendar_id/event/:event_id", async (req, res, next) => {
  const { name } = req.body;
  await CalendarDAO.putEvent(req.params.id, name);
  res.sendStatus(200);
});
// DELETE /calendars/:id/events/:id - deletes event with provided id from specified calendar
router.delete("/:id/events/:id", async (req, res, next) => {
  const calendar = await CalendarDAO.deleteEvent(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
