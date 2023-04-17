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

var nextQuestion = document.querySelector('#next-question-button');

var nameButton = document.querySelector('.name-button');

var tellUserResult = document.querySelector('.section-2');

var topTimeDisplay = document.querySelector('.section-1');

var returnButton = document.querySelector('.return-button');
var startScreen = document.querySelector("#start-page");
//Starts quiz with start button and get the timer to set
startQuiz.addEventListener("click", function () {
    topTimeDisplay.classList.remove('hide');

    var theTime = document.querySelector("#time");
    theTime.setAttribute("style", "display: flex; align-items: center;");
    var startScreen = document.querySelector("#start-page");
    startScreen.classList.add('hide');
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

    var currentQuestion = theQuestions[currentQuestionIndex];
    var submitButton = currentQuestionIndex === 4 ? currentQuestion.querySelector('.submit-quiz') : currentQuestion.querySelector('.submitanswer');

    submitButton.classList.add('hide');
    
    let selectLabel = selected.parentElement;

    if (selected.value === 'correct') {
        secondsLeft += 10;
         score = score + 10;
         selectLabel.setAttribute("style", "background-color: #00bc14; color: white;");
       
    } else {
        secondsLeft -= 10;
        selectLabel.setAttribute("style", "background-color: red;");
    
    }
    
   
    nextQuestion.classList.remove('hide');
}

nextQuestion.addEventListener("click", theNextQuestion);

function theNextQuestion(){
    
    nextQuestion.classList.add('hide');
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
   nextQuestion.classList.add('hide');
   
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

        if (secondsLeft <= 0) {
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

var names = document.querySelector('#thename');
var pastScores = document.querySelector('#scores-list');
let playersName = names.value;


pastScores.innerHTML = localStorage.getItem("player") + localStorage.getItem("score");

nameButton.addEventListener("click", displayPastScores);

function displayPastScores() {
    localStorage.setItem("player", names.value);
    localStorage.setItem("score", score);

   
    pastScores.innerHTML = localStorage.getItem("player") + localStorage.getItem("score");
    
    
}


returnButton.addEventListener("click", restartQuiz);

function restartQuiz() {
    preventDefault();
    var scoresPage = document.querySelector('.finished-screen');
    scoresPage.classList.add('hide');
    startScreen.classList.remove('hide');
}







