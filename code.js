// Define variables
var dogPicList = getColumn("Dogs", "Image");
var dogNameList = getColumn("Dogs", "Name");
var questionNumber = 0;
var correctDog = "";
var score = 0;
var guess = "";

// When start button is clicked takes you to question page
// Calls newQuestion function
// Adds 1 to questionNumber 
onEvent("dogStartButton", "click", function( ) {
  setScreen("questionPage");
  newQuestion(dogPicList, dogNameList);
  questionNumber++;
});
onEvent("startLabel", "click", function( ) {
  setScreen("questionPage");
  newQuestion(dogPicList, dogNameList);
  questionNumber++;
});

// When choice buttons are clicked defines guess as string from the answer choice
// Calls scoreCalc function for the specific answer choice
// Calls newQuestion function
// Adds 1 to questionNumber 
onEvent("choice1", "click", function( ) {
  guess = getText("choice1");
  scoreCalc(guess, correctDog);
  newQuestion(dogPicList, dogNameList);
  questionNumber++;
});
onEvent("choice2", "click", function( ) {
  guess = getText("choice2");
  scoreCalc(guess, correctDog);
  newQuestion(dogPicList, dogNameList);
  questionNumber++;
});
onEvent("choice3", "click", function( ) {
  guess = getText("choice3");
  scoreCalc(guess, correctDog);
  newQuestion(dogPicList, dogNameList);
  questionNumber++;
});
onEvent("choice4", "click", function( ) {
  guess = getText("choice4");
  scoreCalc(guess, correctDog);
  newQuestion(dogPicList, dogNameList);
  questionNumber++;
});

// When play again button is clicked takes you to home page
// Sets questionNumber to 0
// Sets score to 0
onEvent("playAgainButton", "click", function( ) {
  setScreen("homePage");
  questionNumber = 0;
  score = 0;
});


// If questionNumber is less than 5 creates new question and answer choices
// Generates answer choices from the next 3 items from the list
// When question number is greater than 5 sets screen as end page
// list1 {list} - the list for the dog pictures
// list2 {list} - the list for the dog names
function newQuestion(list1, list2) {
  if (questionNumber < 5) {
    var index = randomNumber(0, list1.length - 1);
    correctDog = list2[index];
    setProperty("dogImage", "image", list1[index]);
    var answerChoice = randomNumber(1,4);
    if (index < dogNameList - 5) {
      for (var i = 1; i < 5; i++) {
        if (i == answerChoice) {
          setText("choice"+answerChoice, correctDog);
        } else {
          setText("choice" + i, list2[(index+i)]);
        }
      }
    } else {
      for (var j = 1; j < 5; j++) {
        if (j == answerChoice) {
          setText("choice"+answerChoice, correctDog);
        } else {
          setText("choice" + j, list2[(index-j)]);
        }
      }
    }
  } else {
    if (questionNumber == 5) {
      setScreen("endPage");
    }
  }
}

// Checks if answer choice is correct, depending on score changes text on end page
// answer {string} - the answer choice the user selected
// correct {string} - the correct dog shown in the image
function scoreCalc(answer, correct) {
  if (answer == correct) {
    score++;
  }
  if (score == 5) {
    setText("textAreaEndPage", "You got all 5 correct!");
    setProperty("dogImageEndPage", "image", "assets/happydog.jpg");
    setProperty("endPageTitle", "text", "You Win!");
    setProperty("textSubheadingEndPage", "text", "You're pawesome!");
    } else {
      setText("textAreaEndPage", ("You got " + score) + "/5 correct");
      setProperty("dogImageEndPage", "image", "assets/sadog.jpg");
      setProperty("endPageTitle", "text", "You Lose!");
      setProperty("textSubheadingEndPage", "text", "Life's Ruff.");
      setText("playAgainButton", "Try Again?");
}
}
