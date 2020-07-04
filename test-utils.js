const mongoose = require('mongoose');

module.exports = {};

module.exports.connectDB = async () => {
  await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true });
}

module.exports.stopDB = async () => {
  await mongoose.disconnect();
}

module.exports.generateId = () => mongoose.Types.ObjectId();