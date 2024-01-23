const parseDetails = (details) => {
  const res = {};
  res.type = details.type;
  delete details.type;
  if (details?._id == '') delete details._id;
  res.data = details;
  return res;
};

const API_BASE_URL = 'http://localhost:3000';

const getUrl = (...params) => [API_BASE_URL, ...params.filter((p) => p != null)].join('/');
const getFetchOptions = (method) => ({
  method: method,
  headers: { 'Content-Type': 'application/json' },
});

const getPutOptions = (data) => ({ ...getFetchOptions('PUT'), body: JSON.stringify(data) });
const getPostOptions = (data) => ({ ...getFetchOptions('POST'), body: JSON.stringify(data) });
const getDeleteOptions = () => ({
  method: 'DELETE',
});

// export

const getShape = async (type, id) => {
  const url = getUrl(type, id);
  const res = await fetch(url);
  return res;
};

const getAllShapes = async () => {
  const url = getUrl('shapes');
  const res = await fetch(url);
  return res;
};

const getAllShapesCount = async () => {
  const url = getUrl('shapes', 'reports', 'countAll');
  const res = await fetch(url);
  return res;
};

const postShape = async (details) => {
  const shape = parseDetails(details);
  const url = getUrl(shape.type);
  const options = getPostOptions(shape.data);
  const res = await fetch(url, options);
  return res;
};

const putShape = async (details) => {
  const shape = parseDetails(details);
  const url = getUrl(shape.type, shape.data._id);
  const res = await fetch(url, getPutOptions(shape.data));
  return res;
};

const deleteShape = async (type, id) => {
  const url = getUrl(type, id);
  const res = await fetch(url, getDeleteOptions());
  return res;
};

// module.exports = { getShapes, getShape, postShape, putShape, deleteShape };
