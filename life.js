const WIDTH = 10;
const HEIGHT = 10;

var t;
var matrix = [];

document.addEventListener("DOMContentLoaded", function () {
  gridInit();

  document.querySelector("#start").addEventListener("click", function () {
    matrix = initRandomMtrx();
    fillGrid(matrix);
    t = setInterval(function () {
      evolution(matrix);
    }, 1000);
  });

  document.querySelector("#stop").addEventListener("click", function () {
    clearInterval(t);
  });

  document.querySelector("#step").addEventListener("click", function () {
    evolution(matrix);
  });

  document.querySelector("#clear").addEventListener("click", function () {
    clearInterval(t);
    clearMatrix(matrix);
    clearGrid();
  });

  document.querySelector("table").addEventListener("click", function (event) {
    const c = event.target;
    c.classList.toggle("alive");
    let i = c.parentNode.rowIndex;
    let j = c.cellIndex;

    matrix[i][j] = 1;

    let a = getAliveNeighborsForCell(matrix, i, j);
  });
});

function clearMatrix(m) {
  for (var i = 0; i < HEIGHT; i++) {
    for (var j = 0; j < WIDTH; j++) {
      m[i][j] = 0;
    }
  }
}

function evolution(m) {
  for (var i = 0; i < HEIGHT; i++) {
    for (var j = 0; j < WIDTH; j++) {
      var thisIsAlive = Boolean(m[i][j]) === true;

      let aliveNeighborsCount = getAliveNeighborsForCell(m, i, j);

      if (thisIsAlive && aliveNeighborsCount < 2) {
        m[i][j] = 0;
      } else if (thisIsAlive && aliveNeighborsCount > 3) {
        m[i][j] = 0;
      } else if (!thisIsAlive && aliveNeighborsCount === 3) {
        m[i][j] = 1;
      }
    }
  }
  fillGrid(m);
  return m;
}

function getAliveNeighborsForCell(m, i, j) {
  var upRow = [];
  var sameRow = [];
  var bottomRow = [];

  sameRow.push(m[i][j - 1]);
  sameRow.push(m[i][j + 1]);

  if (m[i - 1]) {
    upRow.push(m[i - 1][j - 1]);
    upRow.push(m[i - 1][j]);
    upRow.push(m[i - 1][j + 1]);
  }

  if (m[i + 1]) {
    bottomRow.push(m[i + 1][j - 1]);
    bottomRow.push(m[i + 1][j]);
    bottomRow.push(m[i + 1][j + 1]);
  }
  neighbors = upRow.concat(sameRow, bottomRow);
  return neighbors.filter((i) => i != undefined && i == 1).length;
}

function clearGrid() {
  document
    .querySelectorAll("td")
    .forEach((item) => item.classList.remove("alive"));
}

function fillGrid(m) {
  const td = document.querySelectorAll("td");
  var x = 0;
  for (var i = 0; i < HEIGHT; i++) {
    for (var j = 0; j < WIDTH; j++) {
      td[x].classList.remove("alive");
      if (Boolean(m[i][j]) && Boolean(td[x])) {
        td[x].classList.add("alive");
      }
      x++;
    }
  }
}

function initRandomMtrx() {
  const m = [];
  for (let i = 0; i < HEIGHT; i++) {
    m[i] = [];
    for (let j = 0; j < WIDTH; j++) {
      m[i][j] = Math.floor(Math.random() < 0.5);
    }
  }
  return m;
}

function gridInit() {
  const table = document.querySelector("#grid");
  table.innerHTML = "";
  var g = "";
  for (let i = 0; i < HEIGHT; i++) {
    g += "<tr>";
    for (let j = 0; j < WIDTH; j++) {
      g += "<td></td>";
    }
    g += "</tr>";
  }
  table.innerHTML = g;
}
