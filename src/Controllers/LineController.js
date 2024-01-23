const Model = require('../Models/LineModel');

const createLine = async (details) => {
  details = { ...details, type: 'line' };
  const data = new Model(details);
  const dataSaved = await data.save();
  return dataSaved;
};

const getLines = async () => {
  const data = await Model.find();
  return data;
};

const getLineById = async (id) => {
  const data = await Model.findById({ _id: id });
  return data;
};

const updateLineById = async (id, details) => {
  const dataUpdated = await Model.findByIdAndUpdate(id, details, { returnDocument: 'after' });
  return dataUpdated;
};

const deleteLineById = async (id) => {
  const dataDeleted = await Model.findByIdAndDelete(id);
  return dataDeleted;
};

const getCount = async () => {
  const count = await Model.countDocuments();
  return count;
};

module.exports = { createLine, getLines, getLineById, updateLineById, deleteLineById, getCount };
