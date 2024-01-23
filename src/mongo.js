const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/MongoFinalProjectShapes';

 const init = () => {
  // init mongo DB
  mongoose.connect(MONGO_URL);

  const database = mongoose.connection;

  database.on('error', (error) => {
    console.log(error);
  });

  database.once('connected', () => {
    console.log('database connected');
  });
};

module.exports = {init}
