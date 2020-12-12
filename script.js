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
        question: 'What is the capital of Australia?',
        choice1: 'Sydney',
        choice2: 'Canberra',
        choice3: 'Melbourne',
        choice4: 'Adelaide',
        answer: 2,
    },
    {
        question: 'How long is the average life span of a Samoyed?',
        choice1: '12 - 14 years',
        choice2: '5 - 8 years',
        choice3: '12 - 15 years',
        choice4: '9 - 15 years',
        answer: 1,
    },
    {
        question: 'When was the first Harry Potter movie was realeased?',
        choice1: '10 June 2001',
        choice2: '18 November 2001',
        choice3: '29 November 2001',
        choice4: '15 July 2001',
        answer: 3,
    },
    {
        question: 'How long is the Great Wall of China?',
        choice1: '19,898 kilometres',
        choice2: '13,371 miles',
        choice3: '17,317 miles',
        choice4: '21,196 kilometres',
        answer: 4,
    },
    {
       question: 'What are the three primary colours',
        choice1: 'Red, Yellow and Blue',
        choice2: 'Red, Yellow and Green',
        choice3: 'Yellow, Red and Black',
        choice4: 'White, Black and Red',
        answer: 1,
    },
    {
        question: 'In Boolean Algebra, 1 + 1 = ?',
        choice1: ' 2 ',
        choice2: ' 0 ',
        choice3: ' 1 ',
        choice4: 'None of the above',
        answer: 3, 
    }
]

// timer function
var startingTimer = 10;

let time = startingTimer * 60;

var countDownEl = document.getElementById('timer');

function updateTimerCountdown() {
    var minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    countDownEl.innerHTML = (minutes + ':' + seconds);
    time--;
    console.log(time);
    
    if(time <= 0) {
        return window.location.assign('end_game.html');
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

        return window.location.assign('end_game.html')
    }

    questionCounter++

    if (questionCounter > 5) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end_game.html')
    }

    progressText.innerText = ('Question ' + questionCounter + ' of ' + numberOfQuestion);

    progressBarFull.style.width = `${(questionCounter/numberOfQuestion) * 100}%`;
    
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
