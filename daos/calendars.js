const Calendars = require("../models/calendars");

module.exports.create = async (name) => {
  return await Calendars.create({ name });
};

module.exports.getById = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.getAll = async () => {
  try {
    const calendar = await Calendars.find().lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.put = async (id, name) => {
  await Calendars.updateOne({ _id: id }, { name: name });
  return;
};

module.exports.delete = async (id) => {
  await Calendars.deleteOne({ _id: id });
  return;
};

// *************************

module.exports.createEvent = async (id, name, date) => {
  try {
    const calendar = await Calendars.findOne({ _id: id });
    calendar.events.push({ name: name, date: date });
    calendar.save();
    return calendar.events[calendar.events.length - 1];
  } catch (e) {
    return null;
  }
};

module.exports.getEventById = async (calendar_id, event_id) => {
  try {
    const calendar = await Calendars.findOne({ _id: calendar_id }).lean();
    return calendar.events.filter((event0) => event0._id.equals(event_id))[0];
  } catch (e) {
    return null;
  }
};

module.exports.getAllEvents = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar.events;
  } catch (e) {
    return null;
  }
};

module.exports.putEvent = async (id, name) => {
  const calendar = await Calendars.findOne({ _id: calendar_id });
  const event0 = await Calendars.findOne({ _id: event_id });
  await event0.updateOne({ _id: id }, { name: name });
  return;
};

module.exports.deleteEvent = async (calendar_id, event_id) => {
  const calendar = await Calendars.findOne({ _id: calendar_id });
  await calendar.events.id(event_id).remove();
  calendar.save();
  return;
};
