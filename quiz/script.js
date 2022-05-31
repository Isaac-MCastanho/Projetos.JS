// initial data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// event

document
  .querySelector(".scoreArea button")
  .addEventListener("click", resetQuiz);

// functions
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];

    let pct = Math.floor((currentQuestion / questions.length) * 100);
    document.querySelector(".progress--bar").style.width = `${pct}%`;

    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";
    document.querySelector(".question").innerHTML = q.question;

    let optionsHtml = "";
    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class='option'><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`;
    }

    document.querySelector(".options").innerHTML = optionsHtml;

    document.querySelectorAll(".option").forEach((element, index) => {
      element.addEventListener("click", optionClickEvent);
    });
  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = e.target.getAttribute("data-op");

  if (questions[currentQuestion].answer === parseInt(clickedOption)) {
    correctAnswers++;
  }
  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);

  document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`;
  document.querySelector(
    ".scoreText2"
  ).innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswers}.`;

  if (points < 50) {
    document.querySelector(".scoreText1").innerHTML = "Tá ruim em?!";
    document.querySelector(".scorePct").style.color = "#FF0000";
  }
  if (points >= 50 && points < 70) {
    document.querySelector(".scoreText1").innerHTML = "Podemos melhorar!";
    document.querySelector(".scorePct").style.color = "#FFF000";
  }
  if (points >= 70) {
    document.querySelector(".scoreText1").innerHTML = "Brilhante cara!";
    document.querySelector(".scorePct").style.color = "#00F000";
  }

  document.querySelector(".progress--bar").style.width = `100%`;
  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".questionArea").style.display = "none";
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  showQuestion();
}
