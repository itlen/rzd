const CELL_SIZE = 8;
const WIDTH = 10;
const HEIGHT = 5;

document.addEventListener("DOMContentLoaded", function () {
  gridInit();
  let matrix = initRandomMtrx();
  gridFill(matrix);

  setInterval(function () {
    let newLife = evolution(matrix);
    gridFill(newLife);
  }, 1000);
});

// TODO пофиксить чтоб работало
function evolution(m) {
  var neighbors = [];
  for (var i = 0; i <= HEIGHT; i++) {
    for (var j = 0; j <= WIDTH; j++) {
      var thisIsAlive = Boolean(m[i][j]);

      neighbors = [
        m[i - 1][j - 1],
        m[i - 1][j],
        m[i - 1][j + 1],

        m[i][j - 1],
        m[i][j + 1],

        m[i + 1][j - 1],
        m[i + 1][j],
        m[i + 1][j + 1],
      ];

      let aliveNeighborsCount = neighbors.filter((i) => Boolean(i)).length;

      if (thisIsAlive && aliveNeighborsCount < 2) {
        m[i][j] = 0;
      }

      if (thisIsAlive && aliveNeighborsCount > 3) {
        m[i][j] = 0;
      }

      if (!thisIsAlive && aliveNeighborsCount > 3) {
        m[i][j] = 1;
      }

      return m;
    }
  }
  return m;
}

// ****************************///////////////

function gridFill(m) {
  const td = document.querySelectorAll("td");
  var x = 0;
  for (var i = 0; i <= HEIGHT; i++) {
    for (var j = 0; j <= WIDTH; j++) {
      x += 1;
      if (Boolean(m[i][j])) {
        td[x].classList.add("alive");
      }
    }
  }
}

function initRandomMtrx() {
  const m = [];
  for (let i = 0; i <= HEIGHT; i++) {
    m[i] = [];
    for (let j = 0; j <= WIDTH; j++) {
      m[i][j] = Math.floor(Math.random() < 0.5);
    }
  }
  return m;
}

// TODO переписать на fragmnet
function gridInit() {
  const table = document.querySelector("#grid");
  var g = "";
  for (let i = 0; i <= HEIGHT; i++) {
    g += "<tr>";
    for (let j = 0; j <= WIDTH; j++) {
      var cl = "";
      // if (Boolean(Math.floor(Math.random() < 0.5))) {
      //   cl = "alive";
      // }
      g += "<td class='" + cl + "'" + cl + "></td>";
    }
    g += "</tr>";
  }
  table.innerHTML = g;
}
