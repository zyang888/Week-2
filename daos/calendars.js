const Calendars = require('../models/calendars');

module.exports = {};

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
  await Calendars.updateOne({  _id: id }, { "name": name });
  return;
};

module.exports.delete = async (id) => {
    await Calendars.deleteOne({  _id: id });
    return;
};
