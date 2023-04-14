//global variables
var timeEl = document.querySelector(".timer");
var timer;
var secondsLeft = 60;
var theQuestions = document.querySelectorAll('.question');
let currentQuestionIndex = 0; // index of the current question
//var correctAnswer = document.querySelectorAll('.correct-answer');
//let currentAnswerIndex = 0;
var startQuiz = document.querySelector(".start-button");
let nextButton = document.querySelector(".submitanswer"); // select the submit button when rendering the current question 
//the last question had a different button since the test should be over after this and results should be displayed
var submitQuizButton = document.querySelector(".submit-quiz");
let rightOrWrong = document.querySelector(".rightOrWrongLabel");
//var currentAnswer = correctAnswer[currentAnswerIndex];
// checkanswer function 
let score = 0;




var tellUserResult = document.querySelector('.section-2');

var topTimeDisplay = document.querySelector('.section-1');

//Starts quiz with start button and get the timer to set
startQuiz.addEventListener("click", function () {
    topTimeDisplay.classList.remove('hide');
    var theTime = document.querySelector("#time");
    theTime.setAttribute("style", "display: flex; align-items: center;");
    var startScreen = document.querySelector("#start-page");
    startScreen.classList.add('hide');
    tellUserResult.classList.add('hide');
    var quizBody = document.querySelector('#quiz-body');
    quizBody.classList.remove('hide');
    setTime();
    renderCurrentQuestion();
});

//make sure to account for if they press next without selecting an answer

function renderCurrentQuestion() {
    var currentQuestion = theQuestions[currentQuestionIndex];
    currentQuestion.classList.remove('hide');

    if (currentQuestionIndex > 0) {
        var previousQuestion = theQuestions[currentQuestionIndex - 1];
        //previousQuestion.classList.add('hide');
        //previousQuestion
        previousQuestion.innerHTML = '';
    }

    var submitButton = currentQuestionIndex === 4 ? currentQuestion.querySelector('.submit-quiz') : currentQuestion.querySelector('.submitanswer');

    submitButton.addEventListener('click', validateAnswer);
}

function validateAnswer() {
    // check if right or wrong
    // based on validity add penalty
    let selected = document.querySelector('input[type="radio"]:checked'); 
    tellUserResult.classList.remove('hide');
    
    if (selected.value === 'correct') {
        secondsLeft += 10;
         score = score + 10;
        tellUserResult.setAttribute("style", "background-color: green;");
        rightOrWrong.textContent = 'Correct';
  

    } else {
        secondsLeft -= 10;
        tellUserResult.setAttribute("style", "background-color: red;");
        rightOrWrong.textContent = 'Incorrect';
    }

    // increase the currentQuestion index
   

    if (currentQuestionIndex < 4) {
        currentQuestionIndex++;

        renderCurrentQuestion();
    }
    else {
        stopQuiz();
        
    }
}


function stopQuiz() {
   var scoresPage = document.querySelector('.finished-screen');
   var quizBody = document.querySelector('#quiz-body');
   var scoreDisplay = document.querySelector('.final-score');
   topTimeDisplay.classList.add('hide');
    quizBody.classList.add('hide');
   scoresPage.classList.remove('hide');
   
   scoreDisplay.textContent = score;

   
    // stop the timer 
    // show the highscores page
}

//rightOrWrong.innerText = selected.parentElement.textContent;
//time function
function setTime() {
    // Sets interval in variable
     timer = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left";

        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timer);
            // Calls function to create and append image
            sendMessage();
        }

    }, 1000);
}


function sendMessage() {
    timeEl.textContent = "Times Up";
    stopQuiz();

}








