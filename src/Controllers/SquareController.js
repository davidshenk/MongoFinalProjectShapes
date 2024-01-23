const Model = require('../Models/SquareModel');

const createSquare = async (details) => {
  details = { ...details, type: 'square' };
  const data = new Model(details);
  const dataSaved = await data.save();
  return dataSaved;
};

const getSquares = async () => {
  const data = await Model.find();
  return data;
};

const getSquareById = async (id) => {
  const data = await Model.findById({ _id: id });
  return data;
};

const updateSquareById = async (id, details) => {
  const dataUpdated = await Model.findByIdAndUpdate(id, details, { returnDocument: 'after' });
  return dataUpdated;
};

const deleteSquareById = async (id) => {
  const dataDeleted = await Model.findByIdAndDelete(id);
  return dataDeleted;
};

const getCount = async () => {
  const count = await Model.countDocuments();
  return count;
};

module.exports = {
  createSquare,
  getSquares,
  getSquareById,
  updateSquareById,
  deleteSquareById,
  getCount,
};
