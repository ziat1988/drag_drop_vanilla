import "./style.scss";

function eventDrag() {
  document.getElementById("my-img").addEventListener("dragstart", function (e) {
    console.log(e.target);
  });

  document.getElementById("my-img").addEventListener("drag", function () {
    // console.log("dragging");
  });
  document.getElementById("my-img").addEventListener("dragend", function () {
    console.log("ending");
  });

  document.getElementById("dropzone").addEventListener("dragenter", function (e) {
    e.preventDefault();
    //console.log(e.target);
  });
  document.getElementById("dropzone").addEventListener("dragover", function (e) {
    e.preventDefault();
    //console.log(e.target);
  });

  document.getElementById("dropzone").addEventListener("drop", function (e) {
    e.preventDefault();
    console.log("droped");
  });
}

eventDrag();

/*-----------------------------Battle Ship Style test-----------------------------------*/

/*----------------------------------------------------------------*/

document.getElementById("app").addEventListener("dragenter", enterZone);
document.getElementById("app").addEventListener("dragover", overZone);
document.getElementById("app").addEventListener("dragleave", leaveZone);
document.getElementById("app").addEventListener("drop", dropZone);

document.getElementById("ship").addEventListener("dragstart", shipDragStart);
document.getElementById("ship").addEventListener("mousedown", getCellClicked);
//document.getElementById("ship").addEventListener("mouseup", resetCellClicked);

// Global STATE:
let cellExplicit = null;
const SIZE_PLAN = 9;
let VALID_DROP = true;

function shipDragStart(e) {
  console.log(e);
}

function getCellClicked(e) {
  cellExplicit = e.target;
}

function resetCellClicked(e) {
  console.log("reset here");
  cellExplicit = null;
}

function validTargetDrop(arrCoord) {
  for (let i = 0; i < arrCoord.length; i++) {
    if (arrCoord[i][0] < 0 || arrCoord[i][0] >= SIZE_PLAN || arrCoord[i][1] < 0 || arrCoord[i][1] >= SIZE_PLAN) {
      return false;
    }
  }
  return true;
}

function dropZone(e) {
  if (!VALID_DROP) {
    return;
  }
  // get root 0,0 cell
  const arrCoordExplicit = cellExplicit.dataset.cell.split(",");
  const rootX = +e.target.dataset.x - +arrCoordExplicit[0];
  const rootY = +e.target.dataset.y - +arrCoordExplicit[1];

  // find that cell with rootX, rootY
  const cellRoot = document.querySelector(`[data-coord="${rootX},${rootY}"]`);

  const coordRootDiv = getPositionCell(cellRoot);

  // change position
  document.getElementById("ship").style.position = "absolute";
  document.getElementById("ship").style.top = coordRootDiv.top + "px";
  document.getElementById("ship").style.left = coordRootDiv.left + "px";

  // reset all highlight
  cleanUpHighlight();
}

function cleanUpHighlight() {
  const listCellDom = document.getElementById("app").getElementsByClassName("cell");

  Array.from(listCellDom).forEach((element) => {
    element.classList.remove("highlight");
  });
}

function overZone(e) {
  e.preventDefault();

  if (e.target.classList.contains("cell")) {
    const arrZone = getAreaHighLight(e.target);
    VALID_DROP = validTargetDrop(arrZone);
    if (!VALID_DROP) {
      return;
    }

    highLightArea(arrZone);
  }
}

function leaveZone(e) {
  const listCellDom = document.getElementById("app").getElementsByClassName("cell");

  Array.from(listCellDom).forEach((element) => {
    element.classList.remove("highlight");
  });
}

function enterZone(e) {
  if (e.target.classList.contains("cell")) {
  }
}

function transformCoord(cellClicked) {}

/**
 *
 * TODO: abstract ship type in argument
 * Formule
 * {
 *    X = x - x0
 *    Y = y - y0
 *  }
 */
function getAreaHighLight(targetDiv) {
  let arrArea = [];
  const coordTarget = targetDiv.dataset;

  const listCell = document.getElementById("ship").getElementsByClassName("cell");
  const arrCoordExplicit = cellExplicit.dataset.cell.split(",");

  // calculer X, Y  transform coordinate
  const X = +coordTarget.x - +arrCoordExplicit[0];
  const Y = +coordTarget.y - +arrCoordExplicit[1];

  Array.from(listCell).forEach((element) => {
    const arrCoord = element.dataset.cell.split(",");

    let coordXLight = X + +arrCoord[0];
    let coordYLight = Y + +arrCoord[1];

    arrArea.push([coordXLight, coordYLight]);
  });

  return arrArea;
}

function highLightArea(arrArea) {
  arrArea.forEach((arr) => {
    const coord = arr.join(",");
    const divTarget = document.querySelector(`[data-coord="${coord}"]`);
    divTarget.classList.add("highlight");
  });
}

function getPositionCell(cell) {
  const offsetCell = cell.getBoundingClientRect();
  const top = offsetCell.top;
  const left = offsetCell.left;
  return { top, left };
}

function createCell() {
  for (let i = 0; i < SIZE_PLAN; i++) {
    const newLine = document.createElement("div");
    newLine.className = "line";
    document.querySelector("#app").appendChild(newLine);

    for (let j = 0; j < SIZE_PLAN; j++) {
      const newCell = document.createElement("div");
      newCell.className = "cell";
      newCell.dataset.x = j;
      newCell.dataset.y = i;
      newCell.dataset.coord = `${j},${i}`;

      newLine.appendChild(newCell);
    }
  }
}

createCell();

/************* */

////  Drag /////
const item = document.querySelector("#item");

// attach the dragstart event handler
item.addEventListener("dragstart", dragStart);

// handle the dragstart

function dragStart(e) {
  console.log("drag starts...");
  e.dataTransfer.setData("text/plain", e.target.id);

  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}

//// DROP Target

const boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
  box.addEventListener("dragenter", dragEnter);
  box.addEventListener("dragover", dragOver);
  box.addEventListener("dragleave", dragLeave);
  box.addEventListener("drop", drop);
});

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragLeave(e) {
  e.target.classList.remove("drag-over");
}

function drop(e) {
  e.preventDefault();
  e.target.classList.remove("drag-over");
  const id = e.dataTransfer.getData("text/plain");

  console.log(id);

  const draggable = document.getElementById(id);
  e.target.appendChild(draggable);

  // display the draggable element
  draggable.classList.remove("hide");
  draggable.classList.remove("drag-over");
}
