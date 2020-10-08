//questions
var pos = 0; //position in quiz-Q#
var correct = 0; //number of questions answered correctly
var test; //test div
var test_status; ////heading displaying user's progress through the test
var question;
var choice; //user's selcted choice
var choices; //[possible answers]
var chA, chB, chC, chD;

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
    questions: "javascript is like:",
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

function get(x) {
  return document.getElementById(x);
}

//renders question on the page
function renderQuestion() {
  test = get("test");
  if (pos >= questions.length) {
    test.innerHTML =
      "<h2> you got " +
      correct +
      " of " +
      questions.length +
      " questions correct.</h2>";
    get(test_status).innerHTML = "test completed";
    //allows user to restart the test by setting position to 0
    pos = 0;
    correct = 0;
    // stops rest of renderQuestion from running when test is complete
    return false;
  }

  get("test_status").innerHTML =
    "Question " + (pos + 1) + " of " + questions.length;

  question = questions[pos].question;
  chA = questions[pos].a;
  chB = questions[pos].b;
  chC = questions[pos].c;
  chD = questions[pos].d;

  //display question
  test.innerhtml = "<h3>" + question + "</h3>";

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
    "<label> <input type ='radio' name = 'choices' value = 'A'> " +
    chD +
    "</label><br>";

  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}
//check answers

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
  }
  pos++;

  renderQuestion();
}
//renders question on page load event

window.addEventListener("load", renderQuestion);
