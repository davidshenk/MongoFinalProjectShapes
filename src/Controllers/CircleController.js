const Model = require('../Models/CircleModel');

const createCircle = async (details) => {
  details = { ...details, type: 'circle' };
  const data = new Model(details);
  const dataSaved = data.save();
  return dataSaved;
};

const getCircles = async () => {
  const data = await Model.find();
  return data;
};

const getCircleById = async (id) => {
  const data = await Model.findById({ _id: id });
  return data;
};

const updateCircleById = async (id, details) => {
  const dataUpdated = await Model.findByIdAndUpdate(id, details, { returnDocument: 'after' });
  return dataUpdated;
};

const deleteCircleById = async (id) => {
  const dataDeleted = await Model.findByIdAndDelete(id);
  return dataDeleted;
};

const getCount = async () => {
  const count = await Model.countDocuments();
  return count;
};

module.exports = {
  createCircle,
  getCircles,
  getCircleById,
  updateCircleById,
  deleteCircleById,
  getCount,
};
