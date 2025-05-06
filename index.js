// * Colors from https://blog.wolfram.com/2014/05/09/2048/
const COLORS = {
  2: ["#776e65", "#eee4da"],
  4: ["#776e65", "#ede0c8"],
  8: ["#f9f6f2", "#f2b179"],
  16: ["#f9f6f2", "#f59563"],
  32: ["#f9f6f2", "#f67c5f"],
  64: ["#f9f6f2", "#f65e3b"],
  128: ["#f9f6f2", "#edcf72"],
  256: ["#f9f6f2", "#edcc61"],
  512: ["#f9f6f2", "#edc850"],
  1024: ["#f9f6f2", "#edc53f"],
  2048: ["#f9f6f2", "#edc22e"],
};

let table = new Array(4).fill(null).map(() => new Array(4).fill(0));
let score = 0;
let bestScore = 0;

/**
 *
 * @returns {Array}
 */
const getRandPos = (min, max) => {
  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    Math.floor(Math.random() * (max - min + 1)) + min,
  ];
};

const update = () => {
  document.getElementById("score").innerHTML = score;
  document.getElementById("bestScore").innerHTML = bestScore;

  const cells = document.getElementsByClassName("cell"); // 0 ~ 15

  // 내가 C에서 배운 2차원 배열을 여기서 다시 쓸 줄이야..
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const cell = cells.item(i * 4 + j);

      if (table[i][j] == 0) {
        cell.innerHTML = "";
        cell.setAttribute("style", "");
        continue;
      }

      cell.innerHTML = table[i][j];
      cell.setAttribute(
        "style",
        `color: ${COLORS[table[i][j]][0]}; background-color: ${
          COLORS[table[i][j]][1]
        }`
      );
    }
  }
};

/**
 *
 * @param {boolean} onlyOne
 * @returns
 */
const makeRandBlock = (onlyOne) => {
  if (table.every((row) => row.every((cell) => cell !== 0))) return;

  let rand, rand2;

  // 겹침 방?지
  do {
    rand = getRandPos(0, 3);
  } while (table[rand[0]][rand[1]] != 0);

  table[rand[0]][rand[1]] = 2;

  if (!onlyOne) {
    do {
      rand2 = getRandPos(0, 3);
    } while (isSame(rand, rand2) || table[rand2[0]][rand2[1]] != 0);

    table[rand2[0]][rand2[1]] = 2;
  }

  update();
};

/**
 *
 * @param {Array} pos1
 * @param {Array} pos2
 */
const isSame = (pos1, pos2) => {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

const init = () => {
  table = new Array(4).fill(null).map(() => new Array(4).fill(0));
  makeRandBlock();
};

init();

window.addEventListener("keydown", (e) => {
  let moved;

  switch (e.key) {
    case "ArrowUp":
      moved = false;
      for (let j = 0; j < 4; j++) {
        let writePos = 0;
        for (let i = 0; i < 4; i++) {
          if (table[i][j] !== 0) {
            if (i !== writePos) {
              table[writePos][j] = table[i][j];
              table[i][j] = 0;
              moved = true;
            }
            writePos++;
          }
        }

        // 즐거운 곱셈시간
        for (let i = 0; i < 3; i++) {
          if (table[i][j] !== 0 && table[i][j] === table[i + 1][j]) {
            table[i][j] *= 2;
            table[i + 1][j] = 0;
            moved = true;

            score += table[i][j];
            if (score > bestScore) bestScore = score;
          }
        }

        writePos = 0;
        for (let i = 0; i < 4; i++) {
          if (table[i][j] !== 0) {
            if (i !== writePos) {
              table[writePos][j] = table[i][j];
              table[i][j] = 0;
              moved = true;
            }
            writePos++;
          }
        }
      }

      if (moved) makeRandBlock(true);
      update();
      break;

    case "ArrowDown":
      moved = false;
      for (let j = 0; j < 4; j++) {
        let writePos = 3;
        for (let i = 3; i >= 0; i--) {
          if (table[i][j] !== 0) {
            if (i !== writePos) {
              table[writePos][j] = table[i][j];
              table[i][j] = 0;
              moved = true;
            }
            writePos--;
          }
        }

        // 즐거운 곱셈시간
        for (let i = 3; i > 0; i--) {
          if (table[i][j] !== 0 && table[i][j] === table[i - 1][j]) {
            table[i][j] *= 2;
            table[i - 1][j] = 0;
            moved = true;

            score += table[i][j];
            if (score > bestScore) bestScore = score;
          }
        }

        writePos = 3;
        for (let i = 3; i >= 0; i--) {
          if (table[i][j] !== 0) {
            if (i !== writePos) {
              table[writePos][j] = table[i][j];
              table[i][j] = 0;
              moved = true;
            }
            writePos--;
          }
        }
      }

      if (moved) makeRandBlock(true);
      update();
      break;

    case "ArrowLeft":
      moved = false;
      for (let i = 0; i < 4; i++) {
        let writePos = 0;
        for (let j = 0; j < 4; j++) {
          if (table[i][j] !== 0) {
            if (j !== writePos) {
              table[i][writePos] = table[i][j];
              table[i][j] = 0;
              moved = true;
            }
            writePos++;
          }
        }

        // 즐거운 곱셈시간
        for (let j = 0; j < 3; j++) {
          if (table[i][j] !== 0 && table[i][j] === table[i][j + 1]) {
            table[i][j] *= 2;
            table[i][j + 1] = 0;
            moved = true;

            score += table[i][j];
            if (score > bestScore) bestScore = score;
          }
        }

        writePos = 0;
        for (let j = 0; j < 4; j++) {
          if (table[i][j] !== 0) {
            if (j !== writePos) {
              table[i][writePos] = table[i][j];
              table[i][j] = 0;
              moved = true;
            }
            writePos++;
          }
        }
      }

      if (moved) makeRandBlock(true);
      update();
      break;

    case "ArrowRight":
      moved = false;
      for (let i = 0; i < 4; i++) {
        let writePos = 3;
        for (let j = 3; j >= 0; j--) {
          if (table[i][j] !== 0) {
            if (j !== writePos) {
              table[i][writePos] = table[i][j];
              table[i][j] = 0;
              moved = true;
            }
            writePos--;
          }
        }

        // 즐거운 곱셈시간
        for (let j = 3; j > 0; j--) {
          if (table[i][j] !== 0 && table[i][j] === table[i][j - 1]) {
            table[i][j] *= 2;
            table[i][j - 1] = 0;
            moved = true;

            score += table[i][j];
            if (score > bestScore) bestScore = score;
          }
        }

        writePos = 3;
        for (let j = 3; j >= 0; j--) {
          if (table[i][j] !== 0) {
            if (j !== writePos) {
              table[i][writePos] = table[i][j];
              table[i][j] = 0;
              moved = true;
            }
            writePos--;
          }
        }
      }

      if (moved) makeRandBlock(true);
      update();
      break;
  }

  // 님아 그강을 건넜습니까
  const canMove = () => {
    if (table.some((row) => row.some((cell) => cell === 0))) return true;

    // 가로 확인
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (table[i][j] === table[i][j + 1]) return true;
      }
    }

    // 세로 확인
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (table[i][j] === table[i + 1][j]) return true;
      }
    }

    return false;
  };

  if (!canMove()) {
    document
      .getElementById("game-over")
      .setAttribute("style", "display: block");
  } else if (table.some((e) => e.some((el) => el === 2048))) {
    // 이거 가능? ㅋㅋ
    document.getElementById("game-win").setAttribute("style", "display: block");
  }
});
