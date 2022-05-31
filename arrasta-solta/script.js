let areas = [];

document.querySelectorAll(".neutralArea").forEach((area) => {
  area.addEventListener("dragover", dragOverNeutral);
  area.addEventListener("dragleave", dragLeaveNeutral);
  area.addEventListener("drop", dropNeutral);
});
document.querySelectorAll(".area").forEach((area) => {
  area.addEventListener("dragover", dragOver);
  area.addEventListener("dragleave", dragLeave);
  area.addEventListener("drop", drop);
});
document.querySelectorAll(".area").forEach((area) => {
  area.addEventListener("dragover", dragOver);
  area.addEventListener("dragleave", dragLeave);
  area.addEventListener("drop", drop);
});
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
});

// Functions Item

function dragStart(e) {
  e.currentTarget.classList.add("dragging");
}
function dragEnd(e) {
  e.currentTarget.classList.remove("dragging");
}

// Functions Area

function dragOver(e) {
  //if (e.currentTarget.querySelector(".item") === null) {
  e.preventDefault();
  e.currentTarget.classList.add("hover");
  //}
}
function dragLeave(e) {
  e.currentTarget.classList.remove("hover");
}
function drop(e) {
  e.currentTarget.classList.remove("hover");
  let item = document.querySelector(".item.dragging");
  if (e.currentTarget.querySelector(".item") === null) {
    e.currentTarget.appendChild(item);
    updateArea();
  } else {
    invertItem(e, item);
    updateArea();
  }
}

// Functions Neutral Area

function dragOverNeutral(e) {
  e.preventDefault();
  e.currentTarget.classList.add("hover");
}
function dragLeaveNeutral(e) {
  e.currentTarget.classList.remove("hover");
}
function dropNeutral(e) {
  e.currentTarget.classList.remove("hover");
  let item = document.querySelector(".item.dragging");

  e.currentTarget.appendChild(item);
  updateArea();
}

// Logic Function

function updateArea() {
  let lengthItem = document.querySelectorAll(".area .item").length;
  let pointsTrue = [];

  document.querySelectorAll(".area").forEach((area, indexArea, arrayArea) => {
    let name = area.getAttribute("data-name");

    // Cria o Array de objetos com o padrao de validação
    if (arrayArea.length !== areas.length) {
      areas = [...areas, { name, indexArea }];
    }

    if (lengthItem == arrayArea.length) {
      hoverSuccess(pointsTrue);
    }

    if (
      document.querySelectorAll(".area .item").length !==
      document.querySelectorAll(".item").length
    ) {
      document.querySelector(".areas").classList.remove("correct");
    }
  });
}

function hoverSuccess(pointsTrue) {
  // Monta array com valores verificados com uma resposta em boolean
  document.querySelectorAll(".area").forEach((item, indexItem) => {
    let idItem = item.querySelector(".item").innerHTML;
    if (
      item.getAttribute("data-name") == areas[indexItem].name &&
      idItem - 1 == areas[indexItem].indexArea
    ) {
      pointsTrue = [...pointsTrue, true];
    } else {
      pointsTrue = [...pointsTrue, false];
    }
  });

  if (
    pointsTrue.every((e) => {
      return e === true;
    })
  ) {
    document.querySelector(".areas").classList.add("correct");
  } else {
    document.querySelector(".areas").classList.remove("correct");
  }
}

// Inverte os itens quando o espaço desejado, esta ocupado
function invertItem(e, item) {
  let areaReception = e.currentTarget;
  let areaInvert = item.parentElement;
  let itemStatic = areaReception.querySelector(".item");

  areaReception.appendChild(item);
  areaInvert.appendChild(itemStatic);
}
