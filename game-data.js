let gameData = {
    score: 0,
    lives: 3,
    level: 1
}

function decrementLives(){
    gameData.lives = gameData.lives - 1;
}

function incrementScore(){
    gameData.score += 1;
}

function increaseLevel(){
    gameData.level += 1;
}

function isGameOver(){
    if(gameData.lives <= 0)
        return true
    else
        return false
}

class gameText {
    constructor(xPosition, yPosition, textSize, textColor, textFont, itemType) {

        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.textSize = textSize;
        this.textColor = textColor;
        this.textFont = textFont;

        this.redraw = function() {
            const canvasElement = document.querySelector('canvas'); 
            const canvasContext = canvasElement.getContext('2d'); 
            canvasContext.font = textSize + ' ' + textFont;
            canvasContext.fillStyle = textColor;
            canvasContext.fillText(this.text, this.xPosition, this.yPosition)             
        }

    }
}