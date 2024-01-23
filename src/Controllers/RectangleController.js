const Model = require('../Models/RectangleModel');

const createRectangle = async (details) => {
  details = { ...details, type: 'rectangle' };
  const data = new Model(details);
  const dataSaved = await data.save();
  return dataSaved;
};

const getRectangles = async () => {
  const data = await Model.find();
  return data;
};

const getRectangleById = async (id) => {
  const data = await Model.findById({ _id: id });
  return data;
};

const updateRectangleById = async (id, details) => {
  const dataUpdated = await Model.findByIdAndUpdate(id, details, { returnDocument: 'after' });
  return dataUpdated;
};

const deleteRectangleById = async (id) => {
  const dataDeleted = await Model.findByIdAndDelete(id);
  return dataDeleted;
};

const getCount = async () => {
  const count = await Model.countDocuments();
  return count;
};

module.exports = {
  createRectangle,
  getRectangles,
  getRectangleById,
  updateRectangleById,
  deleteRectangleById,
  getCount,
};
