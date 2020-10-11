//timer
var timer = 120;

function start() {
  timer = 120;
  startTime = setInterval(showTimer, 1000);
  document.getElementById("startNote").innerHTML = "Timer started";
  renderQuestion();
}

//------------------------------------------------------------------

function showTimer() {
  timer--;
  if (timer < 0) {
    endQuiz();
  }

  minute = Math.floor(timer / 60);
  sec = Math.floor(timer % 60);
  document.getElementById("showTimer").innerHTML = minute + " : " + sec;
}

function endQuiz() {
  clearInterval(startTime);
  if (timer == 0) {
    document.getElementById("startNote").innerHTML = "Time's up!";
  } else {
    document.getElementById("startNote").innerHTML =
      "You answered all the questions! Congratulations";
  }
  test.innerHTML = "<h2> you got </h2>" + correct + "but you missed" + wrong;

  document.getElementById("showTimer").innerHTML = " 0:00 ";
  //allows user to restart the test by setting position and time to 0
  pos = 0;
  correct = 0;
  wrong = 0;
  timer = 0;
}

function renderQuestion() {
  test = document.getElementById("test");

  question = questions[pos].question;
  chA = questions[pos].a;
  chB = questions[pos].b;
  chC = questions[pos].c;
  chD = questions[pos].d;

  //display question
  test.innerHTML = "<h3>" + question + "</h3>";

  //display answer options
  test.innerHTML +=
    "<label> <input type ='radio' name = 'choices' value = 'A'> " +
    chA +
    "</label><br>";
  test.innerHTML +=
    "<label> <input type = 'radio' name = 'choices' value = 'B'> " +
    chB +
    "</label><br>";
  test.innerHTML +=
    "<label> <input type = 'radio' name = 'choices' value = 'C'>" +
    chC +
    "</label><br>";
  test.innerHTML +=
    "<label> <input type ='radio' name = 'choices' value = 'D'> " +
    chD +
    "</label><br>";

  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}

function checkAnswer() {
  //setting a value to selection of choices
  choices = document.getElementsByName("choices");
  for (var i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
    }
  }

  //checking choice against correct answer
  if (choice == questions[pos].answer) {
    correct++;
    sec = sec - 10;
  } else {
    wrong++;
    timer -= 10;
    if (timer < 0) {
      endQuiz();
    }
  }

  pos++;

  if (pos == questions.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

//questions
var pos = 0; //position in quiz-Q#
var correct = 0; //number of questions answered correctly
var test; //test div
var test_status; ////heading displaying user's progress through the test
var question;
var choice; //user's selcted choice
var choices; //[possible answers]
var chA, chB, chC, chD;
var wrong = 0;

var questions = [
  {
    question: "Html is like:",
    a: "the frame of a house",
    b: "the music of the wind",
    c: "the peanut butter of my PBJ",
    d: "the surf on the sand",
    answer: "A",
  },

  {
    question: "CSS is like:",
    a: "the leaves in the wind",
    b: "the jelly of my PBJ",
    c: "the size and color of the rooms",
    d: "the footprints in the sand",
    answer: "C",
  },

  {
    question: "javascript is like:",
    a: "the direction of the wind",
    b: "the bread of my PBJ",
    c: "the sharks in the ocean",
    d: "the way the dishwasher works",
    answer: "D",
  },

  {
    question:
      "The space between the content and the border of the box model is called:",
    a: "padding",
    b: "margin",
    c: "border-space",
    d: "text-margin",
    answer: "A",
  },
];

//check answers

//renders question on page load event

//window.addEventListener("load", renderQuestion);
