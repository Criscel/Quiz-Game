var question = document.getElementById('question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.getElementById('progressText');
var scoreText = document.getElementById('score');
var progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

//list of questions
var questions = [
    {
        question: 'What is the capital of Australia? 2',
        choice1: 'Sydney',
        choice2: 'Canberra',
        choice3: 'Melbourne',
        choice4: 'Adelaide',
        answer: 2,
    },
    {
        question: 'What is the capital of Australia? 1',
        choice1: 'Sydney',
        choice2: 'Canberra',
        choice3: 'Melbourne',
        choice4: 'Adelaide',
        answer: 1,
    },
    {
        question: 'What is the capital of Australia? 3',
        choice1: 'Sydney',
        choice2: 'Canberra',
        choice3: 'Melbourne',
        choice4: 'Adelaide',
        answer: 3,
    },
    {
        question: 'What is the capital of Australia? 1',
        choice1: 'Sydney',
        choice2: 'Canberra',
        choice3: 'Melbourne',
        choice4: 'Adelaide',
        answer: 1,
    },
    {
       question: 'What is the capital of Australia? 1',
        choice1: 'Sydney',
        choice2: 'Canberra',
        choice3: 'Melbourne',
        choice4: 'Adelaide',
        answer: 1,
    }
]

// timer function
var startingTimer = 10;

let time = startingTimer * 60;

var countDownEl = document.getElementById('timer');

function updateTimerCountdown() {
    var minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    seconds = seconds < 30 ? '0' + seconds : seconds;

    countDownEl.innerHTML = (minutes + ':' + seconds);
    time--;
    console.log(time);
    
    if(time <= 0) {
        return window.location.assign('file:///Users/BheNot/Desktop/Week4_Homework/Quiz-Game/end_game.html');
    }
}

// game + incrementing score function
var points = 10
var numberOfQuestion = 5

function startGame () {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    setInterval(updateTimerCountdown, 1000);
}

function getNewQuestion () {
    if(availableQuestions.length === 0 || questionCounter > numberOfQuestion) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('file:///Users/BheNot/Desktop/Week4_Homework/Quiz-Game/end_game.html')
    }

    questionCounter++
    progressText.innerText = ('Question ' + questionCounter + ' of ' + numberOfQuestion);
    progressBarFull.style.width = `${(questionCounter/numberOfQuestion) * 100}%`
    
    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;

        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(points)
        } 

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

        if(classToApply === 'incorrect') {
            time = Math.floor(time - (60 * 3));
            time--;
            console.log(time);
        }
    })
})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();