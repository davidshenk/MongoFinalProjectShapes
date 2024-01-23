// const CircleModel = require('../Models/CircleModel');
// const DotModel = require('../Models/DotModel');
// const LineModel = require('../Models/LineModel');
// const RectangleModel = require('../Models/RectangleModel');
// const SquareModel = require('../Models/SquareModel');
const circleController = require('./CircleController');
const dotController = require('./DotController');
const lineController = require('./LineController');
const rectangleController = require('./RectangleController');
const squareController = require('./SquareController');

const getAllShapes = async () => {
  const circleList = await circleController.getCircles();
  const dotList = await dotController.getDotes();
  const lineList = await lineController.getLines();
  const rectangleList = await rectangleController.getRectangles();
  const squareList = await squareController.getSquares();

  return [...circleList, ...dotList, ...lineList, ...rectangleList, ...squareList];
};

const getCountAllShapes = async () => {
  const circleCount = await circleController.getCount();
  const dotCount = await dotController.getCount();
  const lineCount = await lineController.getCount();
  const rectangleCount = await rectangleController.getCount();
  const squareCount = await squareController.getCount();

  return {
    circle: circleCount,
    dot: dotCount,
    line: lineCount,
    rectangle: rectangleCount,
    square: squareCount,
  };
};

module.exports = { getAllShapes, getCountAllShapes };
