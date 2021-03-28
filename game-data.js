let gameData = {
    score: 0,
    lives: 3
}

function decrementLives(){
    gameData.lives = gameData.lives - 1;
}

function increaseScore(scoreAmount){
    gameData.score += scoreAmount
}

function isGameOver(){
    if(gameData.lives <= 0)
        return true
    else
        return false
}