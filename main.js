let rows, cols;
let selectedColor = '';
const colorSet = [
  '#9400D3',
  '#4B0082',
  '#0000FF',
  '#00FF00',
  '#FFFF00',
  '#FF7F00',
  '#FF0000',
];
let eraser = false;
const editOptions = document.querySelector('#editOptions');
const input = document.querySelector('#gridInput');
const heading = document.querySelector('#heading');
const controlBtns = document.querySelector('#controlBtns');
const createGridEvent = document.querySelector('#createGridBtn');
const grid = document.querySelector('#grid');
const pallete = document.querySelector('#colorPallete');
const clearBtn = document.querySelector('#clearScreenBtn');
const changeGridBtn = document.querySelector('#changeGridBtn');
const eraserBtn = document.querySelector('#eraserBtn');

const setGridDimensions = (e) => {
  if (e.target.id === 'row_input') {
    rows = e.target.value;
  } else {
    cols = e.target.value;
  }
};

const createGrid = () => {
  grid.innerHTML = '';
  pallete.innerHTML = '';
  for (let i = 0; i < cols; i++) {
    let col = document.createElement('div');
    for (let j = 0; j < rows; j++) {
      let box = document.createElement('div');
      box.className = 'box';
      box.id = `${i}#${j}`;
      col.appendChild(box);
    }
    col.className = 'col';
    grid.appendChild(col);
  }
  input.style.display = 'none';
  controlBtns.style.display = 'flex';
  heading.style.display = 'none';
  editOptions.style.display = 'flex';
  createPallete();
};

const createPallete = () => {
  colorSet.map((color) => {
    let colorChoice = document.createElement('div');
    colorChoice.className = 'color_choice';
    // colorChoice.id = color;
    colorChoice.style.backgroundColor = color;
    pallete.appendChild(colorChoice);
  });
};

const setColor = (e) => {
  if (selectedColor !== '') {
    const children = pallete.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('selected_color');
    }
  }
  const color = e.target;
  selectedColor = color.style.backgroundColor;
  color.classList.add('selected_color');
};

const draw = (e) => {
  let cellId = e.target.id;
  let cell = document.getElementById(cellId);
  cell.style.backgroundColor = eraser ? 'white' : selectedColor;
};

const drag = (e) => {
  if (e.buttons === 1 || e.buttons === 3) {
    let cellId = e.target.id;
    let cell = document.getElementById(cellId);
    cell.style.backgroundColor = eraser ? 'white' : selectedColor;
  }
};

const clearGrid = () => {
  const boxes = document.getElementsByClassName('box');
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].style.backgroundColor !== 'white') {
      boxes[i].style.backgroundColor = 'white';
    }
  }
};

const changeGrid = () => {
  input.style.display = 'flex';
};

const erase = () => {
  eraser = !eraser;
  eraserBtn.style.backgroundColor = eraser ? '#022E57' : 'white';
  eraserBtn.style.color = eraser ? 'white' : '#022E57';
};

grid.addEventListener('mousedown', (e) => {
  draw(e);
});

grid.addEventListener('mouseover', (e) => {
  drag(e);
});

input.addEventListener('input', (e) => {
  setGridDimensions(e);
});

createGridEvent.addEventListener('click', createGrid);

pallete.addEventListener('click', (e) => {
  setColor(e);
});

clearBtn.addEventListener('click', clearGrid);

changeGridBtn.addEventListener('click', changeGrid);

eraserBtn.addEventListener('click', erase);
