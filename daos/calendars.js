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

module.exports.createEvent = async (name, date) => {
  return await Calendars.create({ name: name, date: date });
};

module.exports.getEventById = async (id) => {
  try {
    const event0 = await Calendars.findOne({ _id: id }).lean();
    return event0;
  } catch (e) {
    return null;
  }
};

module.exports.getAllEvents = async () => {
  try {
    const event0 = await Calendars.find().lean();
    return event0;
  } catch (e) {
    return null;
  }
};

module.exports.putEvent = async (id, name) => {
  await Calendars.updateOne({ _id: id }, { name: name });
  return;
};

module.exports.deleteEvent = async (id) => {
  await Calendars.deleteOne({ _id: id });
  return;
};
