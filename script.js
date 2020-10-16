//timer
var timer = 60;

function start() {
  document.getElementById("showTimer").innerHTML = " 0:00 ";
  pos = 0;
  correct = 0;
  wrong = 0;
  timer = 60;
  startTime = setInterval(showTimer, 1000);
  document.getElementById("startNote").innerHTML = "Timer started";
  renderQuestion();
}

//------------------------------------------------------------------

function showTimer() {
  timer--;
  if (timer < 0) {
    timer = 0;
    endQuiz();
  }

  minute = Math.floor(timer / 60);
  sec = Math.floor(timer % 60);
  document.getElementById("showTimer").innerHTML = minute + " : " + sec;
}

//----------------------------------------------------------------------

function endQuiz() {
  clearInterval(startTime);
  if (timer <= 0) {
    document.getElementById("startNote").innerHTML = "Time's up!";
  } else {
    document.getElementById("startNote").innerHTML =
      "You answered all the questions! You get a time bonus of 2 points per second remaining! <h4> You had " +
      timer +
      "  seconds left.</h4>";
  }

  score = correct * 10 + timer * 2;
  test.innerHTML =
    "You answered " +
    correct +
    " questions correctly but you missed " +
    wrong +
    " questions. <h2>Your total score is </h2>" +
    score;

  document.getElementById("saveMyScore").style.display = "block";
}

//-----------------------------------------------------------------------

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

//--------------------------------------------------------------------------------

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
  } else {
    wrong++;
    timer -= 10;
  }
  if (timer < 0) {
    endQuiz();
  }
  pos++;

  if (pos == questions.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

//-----------------------------------------------------------------------------
var highscoresList;
function highScore() {
  //get input from saveInitials button
  initialInput = document.getElementById("initials").value;

  //creates an object using initials and score
  scoreline = { name: initialInput, finalScore: score };

  // get previously saved highscores list from local storage
  highscoresList = JSON.parse(localStorage.getItem(highscoresList)) || [];
  console.log(highscoresList);

  //add the current scores
  highscoresList.push(scoreline);
  console.log(highscoresList);

  //sort the list to get the scores in order
  highscoresList.sort(function (a, b) {
    return b - a;
  });
  console.log(highscoresList);

  //save only the top 5
  highscoresList.splice(5);
  console.log(highscoresList);

  for (var i = 0; i < highscoresList.length; i++) {
    document.getElementById("score" + (i + 1)).innerText =
      highscoresList[i].finalScore + "  -  " + highscoresList[i].name;

    localStorage.setItem("highscoresList", JSON.stringify(highscoresList));
  }
}

//------------------------------------------------------------------------------

//questions
var pos = 0; //position in quiz-Q#
var correct = 0; //number of questions answered correctly
var score;
var wrong = 0; //number of querstions answered incorrectly
var test; //test div
var question; //individual question
var choice; //user's selected choice
var choices; //[possible answers]
var chA, chB, chC, chD;
var initialInput;

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
  {
    question: "How do you comfort a javascript bug?",
    a: "feed it some of your snacks",
    b: "marginMake it a nest of the hair you've pulled out",
    c: "border-spaceLet it drink your tears",
    d: "console it",
    answer: "D",
  },
  {
    question: "Is it possible to create an array of arrays?",
    a: "Yes",
    b: "No",
    c: "Sometimes",
    d: "All arrays contain arrays",
    answer: "A",
  },
  {
    question: "What is a String?",
    a: "a true or false statement",
    b: "a series of 5 or more numbers",
    c: "a series of characters",
    d: "a long line of dashes or underscores",
    answer: "C",
  },
  {},
];
