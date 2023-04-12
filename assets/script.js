//global variables
var timeEl = document.querySelector(".timer");
var timer;
var secondsLeft = 60;
var theQuestions = document.querySelectorAll('.question');
let currentQuestionIndex = 0; // index of the current question
var startQuiz = document.querySelector(".start-button");
let nextButton = document.querySelector(".submitanswer"); // select the submit button when rendering the current question 
//the last question had a different button since the test should be over after this and results should be displayed
var submitQuizButton = document.querySelector(".submit-quiz");
let rightOrWrong = document.querySelector(".rightOrWrongLabel");
// checkanswer function 
let score = 0;

var topTimeDisplay = document.querySelector('.section-1');

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

function renderCurrentQuestion() {
    var currentQuestion = theQuestions[currentQuestionIndex];
    currentQuestion.classList.remove('hide');

    if (currentQuestionIndex > 0) {
        var previousQuestion = theQuestions[currentQuestionIndex - 1];
        previousQuestion.classList.add('hide');
    }

    var submitButton = currentQuestionIndex === 4 ? currentQuestion.querySelector('.submit-quiz') : currentQuestion.querySelector('.submitanswer');

    submitButton.addEventListener('click', validateAnswer);
}

function validateAnswer() {
    // check if right or wrong
    // based on validity add penalty
    let selected = document.querySelector('input[type="radio"]:checked'); 
    var correctAnswer = document.querySelector('.correct-answer');

    if (selected === correctAnswer) {
        console.log("you got it right");
    } else {
        console.log("wrong");
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
   topTimeDisplay.classList.add('hide');
    quizBody.classList.add('hide');
   scoresPage.classList.remove('hide');
   
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



//create functions for if the answer is right and if it is wrong

//answer is right function: needs to add time to timer and i want it to give the answer field a green border and notify correct


//answer is wrong: will subtract time, give the answer field a red border, and notifies that the user got it wrong


// then these if statements will determine if the answer is correct or not and determine which function to call
/*
if (currentQuestion === 1) {
    if (selected.value === "1-D") {
        //call answer is right function
    } else {
        //call answer is wrong function
    }
}


nextButton.addEventListener('click', () => {
    let selected = document.querySelector('input[type="radio"]:checked');
    rightOrWrong.innerText = selected.parentElement.textContent;
});

*/





