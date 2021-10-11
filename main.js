let rows, cols;
let selectedColor;
const colorSet = [
  '#9400D3',
  '#4B0082',
  '#0000FF',
  '#00FF00',
  '#FFFF00',
  '#FF7F00',
  '#FF0000',
];
const input = document.querySelector('#gridInput');
const createGridEvent = document.querySelector('#createGridBtn');
const grid = document.querySelector('#grid');
const pallete = document.querySelector('#colorPallete');
const clearBtn = document.querySelector('#clearScreenBtn');

const setGridDimensions = (e) => {
  if (e.target.id === 'row_input') {
    rows = e.target.value;
  } else {
    cols = e.target.value;
  }
};

const createGrid = () => {
  grid.innerHTML = '';
  for (let i = 0; i < cols; i++) {
    let col = document.createElement('div');
    for (let j = 0; j < rows; j++) {
      let box = document.createElement('div');
      box.className = 'box';
      box.id = `"${i}${j}"`;
      col.appendChild(box);
    }
    col.className = 'col';
    grid.appendChild(col);
  }
};

const createPallete = () => {
  colorSet.map((color) => {
    let colorChoice = document.createElement('div');
    colorChoice.className = 'color_choice';
    colorChoice.style.backgroundColor = color;
    pallete.appendChild(colorChoice);
  });
};

const setColor = (e) => {
  selectedColor = e.target.style.backgroundColor;
};

const draw = (e) => {
  let cellId = e.target.id;
  let cell = document.getElementById(cellId);
  cell.style.backgroundColor = selectedColor;

  grid.addEventListener('mouseover', (e) => {
    if (e.buttons === 1 || e.buttons === 3) {
      let cellId = e.target.id;
      let cell = document.getElementById(cellId);
      cell.style.backgroundColor = selectedColor;
    }
  });
};

const clearGrid = () => {
  const boxes = document.getElementsByClassName('box');
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].style.backgroundColor !== 'white') {
      boxes[i].style.backgroundColor = 'white';
    }
  }
};

grid.addEventListener('mousedown', (e) => {
  draw(e);
});

input.addEventListener('input', (e) => {
  setGridDimensions(e);
});

createGridEvent.addEventListener('click', createGrid);

pallete.addEventListener('click', (e) => {
  setColor(e);
});

clearBtn.addEventListener('click', clearGrid);

createPallete();
