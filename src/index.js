const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { init } = require('./mongo');

const dotController = require('./Controllers/DotController');
const lineController = require('./Controllers/LineController');
const SquareController = require('./Controllers/SquareController');
const rectangleController = require('./Controllers/RectangleController');
const circleController = require('./Controllers/CircleController');
const shapesController = require('./Controllers/ShapeController');

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`server is listening on http://localhost:${port}/`));

init();

// Routes
const sendResponseNewShape = (response, shape) => {
  const statusCode = shape ? 201 : 400;
  const json = shape || { error: 'invalid error' };
  response.status(statusCode).json(json);
};

// dot
app.post('/dot/', async (req, res) => {
  const details = req.body;
  const newDot = await dotController.createDot(details);

  sendResponseNewShape(res, newDot);
});

app.get('/dot/', async (req, res) => {
  const dotList = await dotController.getDotes();
  res.json(dotList);
});

app.get('/dot/:id/', async (req, res) => {
  const { id } = req.params;
  const dot = await dotController.getDotById(id);
  res.json(dot);
});

app.put('/dot/:id/', async (req, res) => {
  const { id } = req.params;
  const details = req.body;
  const updatedDot = await dotController.updateDotById(id, details);
  res.json(updatedDot);
});

app.delete('/dot/:id/', async (req, res) => {
  const { id } = req.params;
  const deletedDot = await dotController.deleteDotById(id);
  res.json(deletedDot);
});

// line
app.post('/line/', async (req, res) => {
  const details = req.body;
  const newLine = await lineController.createLine(details);
  sendResponseNewShape(res, newLine);
});

app.get('/line/', async (req, res) => {
  const lineList = await lineController.getLines();
  res.json(lineList);
});

app.get('/line/:id/', async (req, res) => {
  const { id } = req.params;
  const line = await lineController.getLineById(id);
  res.json(line);
});

app.put('/line/:id/', async (req, res) => {
  const { id } = req.params;
  const details = req.body;
  const updatedLine = await lineController.updateLineById(id, details);
  res.json(updatedLine);
});

app.delete('/line/:id/', async (req, res) => {
  const { id } = req.params;
  const deletedLine = await lineController.deleteLineById(id);
  res.json(deletedLine);
});

// square
app.post('/square/', async (req, res) => {
  const details = req.body;
  const newSquare = await SquareController.createSquare(details);
  sendResponseNewShape(res, newSquare);
});

app.get('/square/', async (req, res) => {
  const squarelist = await SquareController.getSquares();
  res.json(squarelist);
});

app.get('/square/:id/', async (req, res) => {
  const { id } = req.params;
  const square = await SquareController.getSquareById(id);
  res.json(square);
});

app.put('/square/:id/', async (req, res) => {
  const { id } = req.params;
  const details = req.body;
  const updatedSquare = await SquareController.updateSquareById(id, details);
  res.json(updatedSquare);
});

app.delete('/square/:id/', async (req, res) => {
  const { id } = req.params;
  const deletedSquare = await SquareController.deleteSquareById(id);
  res.json(deletedSquare);
});

// rectangle
app.post('/rectangle/', async (req, res) => {
  const details = req.body;
  const newRectangle = await rectangleController.createRectangle(details);
  sendResponseNewShape(res, newRectangle);
});

app.get('/rectangle/', async (req, res) => {
  const rectangleList = await rectangleController.getRectangles();
  res.json(rectangleList);
});

app.get('/rectangle/:id/', async (req, res) => {
  const { id } = req.params;
  const rectangle = await rectangleController.getRectangleById(id);
  res.json(rectangle);
});

app.put('/rectangle/:id/', async (req, res) => {
  const { id } = req.params;
  const details = req.body;
  const updatedRectangle = await rectangleController.updateRectangleById(id, details);
  res.json(updatedRectangle);
});

app.delete('/rectangle/:id/', async (req, res) => {
  const { id } = req.params;
  const deletedRectangle = await rectangleController.deleteRectangleById(id);
  res.json(deletedRectangle);
});

// circle
app.post('/circle/', async (req, res) => {
  const details = req.body;
  const newCircle = await circleController.createCircle(details);
  sendResponseNewShape(res, newCircle);
});

app.get('/circle/', async (req, res) => {
  const circleList = await circleController.getCircles();
  res.json(circleList);
});

app.get('/circle/:id/', async (req, res) => {
  const { id } = req.params;
  const circle = await circleController.getCircleById(id);
  res.json(circle);
});

app.put('/circle/:id/', async (req, res) => {
  const { id } = req.params;
  const details = req.body;
  const updatedCircle = await circleController.updateCircleById(id, details);
  res.json(updatedCircle);
});

app.delete('/circle/:id/', async (req, res) => {
  const { id } = req.params;
  const deletedCircle = await circleController.deleteCircleById(id);
  res.json(deletedCircle);
});

// shapes
app.get('/shapes/', async (req, res) => {
  const list = (await shapesController.getAllShapes()) || [];
  res.json(list);
});

app.get('/shapes/reports/countAll/', async (req, res) => {
  const result = (await shapesController.getCountAllShapes());
  res.json(result);
});
