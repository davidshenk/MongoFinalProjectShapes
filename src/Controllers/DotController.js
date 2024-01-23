const Model = require('../Models/DotModel');

const createDot = async (details) => {
  details = { ...details, type: 'dot' };
  const data = new Model(details);
  const dataSaved = await data.save();
  return dataSaved;
};

const getDotes = async () => {
  const data = await Model.find();
  return data;
};

const getDotById = async (id) => {
  const data = await Model.findById({ _id: id });
  return data;
};

const updateDotById = async (id, details) => {
  const dataUpdated = await Model.findByIdAndUpdate(id, details, { returnDocument: 'after' });
  return dataUpdated;
};

const deleteDotById = async (id) => {
  const dataDeleted = await Model.findByIdAndDelete(id);
  return dataDeleted;
};

const getCount = async () => {
  const count = await Model.countDocuments();
  return count;
};

module.exports = { createDot, updateDotById, deleteDotById, getDotes, getDotById, getCount };
