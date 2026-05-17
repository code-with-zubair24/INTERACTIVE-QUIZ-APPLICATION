// Home page and quiz page
const homePage = document.getElementById("home-page");
const quizPage = document.getElementById("quiz-page");
const startBtn = document.getElementById("start-btn");

// Start quiz button click
startBtn.addEventListener("click", () => {

    // Hide home page
    homePage.style.display = "none";

    // Show quiz page
    quizPage.style.display = "block";

    // Start quiz
    startQuiz();
});
// Array storing all quiz questions and answers
const questions = [
    {
        question: "what does Java Script mainly do in a website?",
        answers: [
            { text: "Creates database", correct: false },
            { text: "Designs hardware", correct: false },
            { text: "Adds interactivity", correct: true },
            { text: "Controls internet speed", correct: false }
        ]
    },
    // More questions can be added here
    {
        question: "Which of the following is a JavaScript framework?",
        answers: [
            { text: "HTML", correct: false },
            { text: "React", correct: true },
            { text: "CSS", correct: false },
            { text: "Node.js", correct: false }
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Netscape", correct: true },
            { text: "Microsoft", correct: false },
            { text: "Sun Microsystems", correct: false },
            { text: "Google", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true }
        ]
    },
    {
        question: "which CSS property is used to make a website responsive?",
        answers: [
            { text: "width", correct: false },
            { text: "height", correct: false },
            { text: "media queries", correct: true },
            { text: "flexbox", correct: false}
        ]
    }
];

//Getting HTML elements using their IDs 

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

//Starts or restarts the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//Displays the current question and its answer
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //Creating answer buttons dynamically 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        //Storing the correct answer in a data attribute for later use
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        //Adding click event listener to each answer button
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//checks if the selected answer is correct and updates the score accordingly
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    //if the answer is correct
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    //highlighting the correct answer and disabling all buttons after an answer is selected
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
//Displays the final score after the quiz is completed
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
//Moves to the next question 
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

//next button click event
nextButton.addEventListener("click", () => {
if (currentQuestionIndex < questions.length) {
    handleNextButton();
} else {
    startQuiz();
}
});

