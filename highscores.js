var highScoresList = document.getElementById('highScoresList');
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];


highScoresList. innerHTML = highScores.map(function (score) {
    return '<li class="high-score">' + score.name + ' - ' + score.score + '</li>';
}).join("");

//localStorage.clear();