// import * as api from './http';

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

let prevFocusedElement;

const shapeTypes = ['dot', 'line', 'square', 'rectangle', 'circle'];
const shapesArea = document.getElementById('shapes-area');

const getShapeProperties = (details) => {
  const alwaysShow = ['type', '_id', 'color'];

  let elementsToShow = [...alwaysShow];

  if (details.type === 'dot') elementsToShow = [...elementsToShow, 'x', 'y'];
  else if (details.type === 'line')
    elementsToShow = [...elementsToShow, 'x', 'y', 'length', 'vertical'];
  else if (details.type === 'square') elementsToShow = [...elementsToShow, 'x', 'y', 'length'];
  else if (details.type === 'rectangle')
    elementsToShow = [...elementsToShow, 'x', 'y', 'width', 'height'];
  else if (details.type === 'circle') elementsToShow = [...elementsToShow, 'x', 'y', 'radius'];

  // const shape = Object.entries(details)
  //   .filter(([key, value]) => elementsToShow.findIndex((e) => e === key) > -1)
  //   .map(([key, value]) => ({ [key]: value }));
  const shape = Object.fromEntries(
    Object.entries(details).filter(([key, value]) => elementsToShow.includes(key))
  );

  return shape;
};

const shapeIdPrefix = 'shape-';
const getShapeId = (id) =>
  !`${id}`.startsWith(shapeIdPrefix) ? `${shapeIdPrefix}${id}` : id.substring(shapeIdPrefix.length);

const setFormTypeOptions = () => {
  const select = document.getElementById('shape-type');

  shapeTypes.forEach((type) => {
    const option = document.createElement('option');
    option.value = type;
    option.text = capitalizeFirstLetter(type);
    select.appendChild(option);
  });
};
setFormTypeOptions();

const hidden = 'visually-hidden';

const getFormElements = () => ({
  type: document.getElementById('shape-type'),
  _id: document.getElementById('shape-id'),
  x: document.getElementById('shape-x'),
  y: document.getElementById('shape-y'),
  color: document.getElementById('shape-color'),
  radius: document.getElementById('shape-radius'),
  length: document.getElementById('shape-length'),
  vertical: document.getElementById('shape-vertical'),
  width: document.getElementById('shape-width'),
  height: document.getElementById('shape-height'),
  deleteGroup: document.getElementById('shape-delete-group'),
});

const getFormElementsGroup = () => ({
  type: document.getElementById('shape-type-group'),
  _id: document.getElementById('shape-id-group'),
  x: document.getElementById('shape-x-group'),
  y: document.getElementById('shape-y-group'),
  color: document.getElementById('shape-color-group'),
  radius: document.getElementById('shape-radius-group'),
  length: document.getElementById('shape-length-group'),
  vertical: document.getElementById('shape-vertical-group'),
  width: document.getElementById('shape-width-group'),
  height: document.getElementById('shape-height-group'),
  delete: document.getElementById('shape-delete-group'),
});

const getShapeDetailsFromForm = () => {
  const elements = getFormElements();

  const keys = [
    'type',
    '_id',
    'x',
    'y',
    'color',
    'radius',
    'length',
    'vertical',
    'width',
    'height',
  ];

  const result = {};
  keys.forEach((key) =>
    key === 'vertical'
      ? (result[key] = elements[key]?.checked)
      : (result[key] = elements[key]?.value)
  );

  return result;
};

const postOrPutShape = (details) => {};

const getBaseElemenNode = (id, classes) => {
  const element = document.createElement('div');
  element.classList.add('shape');
  element.id = getShapeId(id);

  classes.forEach((c) => {
    element.classList.add(c);
  });

  return element;
};

const createElementDot = (details) => {
  const element = getBaseElemenNode(details._id, ['shape-dot']);

  element.style.left = details.x + 'px';
  element.style.top = details.y + 'px';
  element.style.backgroundColor = details.color;

  return element;
};
const createElementLine = (details) => {
  const element = getBaseElemenNode(details._id, ['shape-line']);
  element.style.left = details.x + 'px';
  element.style.top = details.y + 'px';
  element.style.borderColor = details.color;

  element.style[details.vertical ? 'height' : 'width'] = details.length + 'px';

  return element;
};
const createElementSquare = (details) => {
  const element = getBaseElemenNode(details._id, ['shape-square']);
  element.style.left = details.x + 'px';
  element.style.top = details.y + 'px';
  element.style.width = details.length + 'px';
  element.style.height = details.length + 'px';
  element.style.borderColor = details.color;

  return element;
};
const createElementRectangle = (details) => {
  const element = getBaseElemenNode(details._id, ['shape-rectangle']);
  element.style.left = details.x + 'px';
  element.style.top = details.y + 'px';
  element.style.width = details.width + 'px';
  element.style.height = details.height + 'px';
  element.style.borderColor = details.color;

  return element;
};
const createElementCircle = (details) => {
  const element = getBaseElemenNode(details._id, ['shape-circle']);
  element.style.left = details.x + 'px';
  element.style.top = details.y + 'px';

  element.style.transform = `translate(${-details.radius}px, ${-details.radius}px)`;

  const width = `${details.radius * 2}px`;
  element.style.width = width;
  element.style.height = width;

  element.style.borderColor = details.color;

  return element;
};

const createShapeElement = (details) => {
  let element;

  switch (details.type) {
    case 'dot':
      element = createElementDot(details);
      break;
    case 'line':
      element = createElementLine(details);
      break;
    case 'square':
      element = createElementSquare(details);
      break;
    case 'rectangle':
      element = createElementRectangle(details);
      break;
    case 'circle':
      element = createElementCircle(details);
      break;
    default:
      break;
  }

  element.classList.add(`shape-type-${details.type}`);

  element.addEventListener('click', async (e) => {
    const id = getShapeId(e.target.id);
    const prefix = 'shape-type-';
    const type = Array.from(e.target.classList)
      .find((c) => c.startsWith(prefix))
      .substring(prefix.length);
    const res = await getShape(type, id);
    const shape = await res.json();
    updateForm(shape);
  });

  const area = document.getElementById('shapes-area');
  area.appendChild(element);
};

const updateForm = (details) => {
  const elements = getFormElements();
  const groups = getFormElementsGroup();

  const alwaysShow = ['type', '_id', 'color'];

  // clear all elements values
  for (const key in elements) {
    elements[key].value = details[key] || null;

    if (key === 'vertical') elements[key].checked = details[key];
  }

  let elementsToShow = [...alwaysShow];

  if (details.type === 'dot') elementsToShow = [...elementsToShow, 'x', 'y'];
  else if (details.type === 'line')
    elementsToShow = [...elementsToShow, 'x', 'y', 'length', 'vertical'];
  else if (details.type === 'square') elementsToShow = [...elementsToShow, 'x', 'y', 'length'];
  else if (details.type === 'rectangle')
    elementsToShow = [...elementsToShow, 'x', 'y', 'width', 'height'];
  else if (details.type === 'circle') elementsToShow = [...elementsToShow, 'x', 'y', 'radius'];

  for (const [key, elem] of Object.entries(groups)) {
    if (elementsToShow.findIndex((elem) => elem === key) > -1) elem.classList.remove(hidden);
    else elem.classList.add(hidden);
  }

  if (details._id == null) elements.deleteGroup.classList.add(hidden);
  else elements.deleteGroup.classList.remove(hidden);
};

const drawShape = (shape) => {
  // update HTML
  createShapeElement(shape);

  // update form
  updateForm(shape);
};

const createOrUpdateShape = async (details) => {
  let shape = details || getShapeDetailsFromForm();
  shape = getShapeProperties(shape);

  // save to DB
  let res;

  if (shape._id) res = await putShape(shape);
  else res = await postShape(shape);

  const createdShape = await res.json();

  // // TODO: delete after implementation
  // createdShape = shape;
  // // createdShape.id = Math.random().toString().substring(2);
  // shapes.push(createdShape);

  // delete element from html if updated
  handleDelete(false);

  drawShape(createdShape);
};

const drawAllShapes = (shapes) => shapes.forEach((shape) => drawShape(shape));

const handleClear = (resetType = true) => {
  const elements = getFormElements();
  for (const [key, elem] of Object.entries(elements)) {
    if (key === 'color') elem.value = '#000000';
    else if (key === 'deleteGroup') elem.classList.add(hidden);
    else if (key === 'type' && !resetType) continue;
    else elem.value = null;
  }
};

const handleSave = async () => {
  await createOrUpdateShape();
};

const handleDelete = async (deleteFromDB = true) => {
  const { _id, type } = getShapeDetailsFromForm();

  if (deleteFromDB) {
    const res = await deleteShape(type, _id);
    if (!res.ok) return;
  }

  const element = document.getElementById(getShapeId(_id));
  if (element) element.parentNode.removeChild(element);

  handleClear();
};

const handleSelectChanged = () => {
  handleClear(false);
  const details = getShapeDetailsFromForm();
  updateForm(details);
};

const setShapesAreaSize = () => {
  const height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  const area = document.getElementById('shapes-area');
  const areaRect = area.getBoundingClientRect();

  const areaHeight = height - areaRect.top;
  area.style.height = areaHeight + 'px';
};

const getLocationWithinShapesArea = (e) => {
  const rect = shapesArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  return { x, y };
};
const handleShapesAreaMouseMove = (e) => {
  const { x, y } = getLocationWithinShapesArea(e);

  const tooltip = shapesArea.querySelector('#tooltip');

  let text = `x: ${x}\ny: ${y}` || '';
  if (prevFocusedElement) text = 'Click to set X and Y position.\n' + text;

  tooltip.innerText = text;
  tooltip.style.left = e.clientX + 20 + 'px';
  tooltip.style.top = e.clientY + 20 + 'px';
};
const handleShapesAreaMouseLeave = (e) => {
  const tooltip = e.target.querySelector('#tooltip');
  tooltip.innerText = '';
};
const handleShapesAreaMouseClick = (e) => {
  if (!prevFocusedElement) return;
  const { x, y } = getLocationWithinShapesArea(e);
  if (prevFocusedElement.id.startsWith('shape-x')) {
    prevFocusedElement.value = x;
    prevFocusedElement.parentNode.nextElementSibling.getElementsByTagName('input')[0].value = y;
  }
  prevFocusedElement = null;
};

shapesArea.addEventListener('mousemove', handleShapesAreaMouseMove);
shapesArea.addEventListener('mouseleave', handleShapesAreaMouseLeave);
shapesArea.addEventListener('click', handleShapesAreaMouseClick);

const addListenerHandleClickPosition = () => {
  const filteredElements = Object.entries(getFormElements())
    // .filter(([key, elem]) => elem.type === 'number')
    .map(([key, elem]) => elem);

  filteredElements.forEach((element) => {
    element.addEventListener('click', (e) => {
      if (e.target.id.startsWith('shape-x') || e.target.id.startsWith('shape-y'))
        prevFocusedElement = e.target;
      else prevFocusedElement = null;
    });
  });
};

const init = async () => {
  setShapesAreaSize();
  addListenerHandleClickPosition();
  updateForm({ type: 'dot' });

  const res = await getAllShapes();
  const json = await res.json();
  drawAllShapes(json);
};

setTimeout(async () => {
  await init();
}, 10);

const updateCount = async () => {
  const element = document.getElementById('shape-count');

  const res = await getAllShapesCount();
  const data = await res.json();

  element.value = JSON.stringify(data);
};
