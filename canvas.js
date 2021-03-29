// ! convert all functions into ES6 syntax

const canvasElement = document.querySelector('canvas'); 
const canvasContext = canvasElement.getContext('2d'); 

function styleCanvas(){
    const canvasBackgroundColor = "#f1f1f1";
    canvasContext.fillStyle = canvasBackgroundColor;
    canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);    
}

styleCanvas()

function getRandomYPosition(){
    return Math.random()*(125-0+1);
}

function getRandomSpeedInRange(){
    return Math.random()*(0.3-0.1+1);
}

const backgroundImage = new gameItem(150, 300, 0, 0, 'https://static.vecteezy.com/system/resources/previews/000/538/717/non_2x/vector-illustration-clouds-on-blue-sky-background.jpg', 'img', 0)
const playerItem = new gameItem(20, 25, 20, 60, './assets/airplane_2708.png', 'img', 0.3);
const livesText = new gameText(5, 10, '12px', 'SlateBlue', 'Arial', 'text')
const scoreText = new gameText(50, 10, '12px', 'SlateBlue', 'Arial', 'text')
const levelText = new gameText(100, 10, '12px', 'SlateBlue', 'Arial', 'text')
const gameOverText = new gameText(5, 100, '11px', 'red', 'Arial', 'text')

const benefitItem = new gameItem(15, 15, 300, getRandomYPosition(), './assets/pump.png', 'img', 0.3);


let harmfulItemsList = []

function addHarmObjects(amountOfHarmObjs){
    let i;
    for(i = 0; i < amountOfHarmObjs; i++){
        const randomYPosition = getRandomYPosition()
        const randomSpeed = getRandomSpeedInRange()
        const harmfulItem = new gameItem(15, 15, 300, randomYPosition, './assets/missle-2.png', 'img', randomSpeed);
        harmfulItemsList.push(harmfulItem)        
    }
}

addHarmObjects(1)

function sceneCleanUp(){
    var canvas = document.getElementById('gameCanvas');
    var width = canvas.width;
    var height = canvas.height;    
    canvasContext.clearRect(0, 0, width, height)
}

function getGameObjectProperties(gameObject){
    const gameObjProperties = {
        top: gameObject.yPosition,
        bottom: gameObject.itemHeight + gameObject.yPosition,
        left: gameObject.xPosition,
        right: gameObject.itemWidth + gameObject.xPosition
    }

    return gameObjProperties;
}

function areObjectsColliding(objectOne, objectTwo){
    let areObjectColliding = true;
    let objOneProperties = getGameObjectProperties(objectOne)
    let objTwoProperties = getGameObjectProperties(objectTwo)

    if( objOneProperties.top > objTwoProperties.bottom || objOneProperties.bottom < objTwoProperties.top || objOneProperties.left > objTwoProperties.right || objOneProperties.right < objTwoProperties.left ){
        areObjectColliding = false
    }

    return areObjectColliding
}

function moveHarmObjectLeft(index){
    harmfulItemsList[index].xPosition = harmfulItemsList[index].xPosition - harmfulItemsList[index].xAxisMoveRate;
}

function movePlayerUp(){
    playerItem.yAxisMoveRate = playerItem.yAxisMoveRate - 1;
}

function movePlayerDown(){
    playerItem.yAxisMoveRate = playerItem.yAxisMoveRate + 1;
}

function haltPlayerMovement(){
    playerItem.yAxisMoveRate = 0;
}

function repositionObject(harmObj){
    harmObj.xPosition = 300; //reset x position to right side of canvas
    harmObj.yPosition = getRandomYPosition(); // pick a random y position in range
    harmObj.xAxisMoveRate += getRandomSpeedInRange(); //make the object speed faster as game progresses
}

function manageGameObjectCollision(harmfulItem){    
    let i;
    for(i = 0; i < harmfulItemsList.length; i++){
        const harmfulItem = harmfulItemsList[i]
        if(areObjectsColliding(playerItem, harmfulItem)){
            repositionObject(harmfulItem)
            decrementLives();
            // if(isGameOver()){
            //     isGameOver = true;
            // }
        }     
    }   
    
    if(areObjectsColliding(playerItem, benefitItem)){
        repositionObject(benefitItem)
        incrementScore()
        if(gameData.score % 2 == 0){
            increaseLevel()
        }
    }
    
}



function manageHarmfulObjects(){
    let i;
    for(i = 0; i < harmfulItemsList.length; i++){
        moveHarmObjectLeft(i)
        harmfulItemsList[i].drawComponent()        

        if(harmfulItemsList[i].xPosition <= -30){
            repositionObject(harmfulItemsList[i])
            if(harmfulItemsList.length < 4){
                addHarmObjects(1)
            }
        }        
    }
}

function manageBenefitObject(){
    benefitItem.xPosition = benefitItem.xPosition - benefitItem.xAxisMoveRate;
    benefitItem.drawComponent()

    if(benefitItem.xPosition <= -30){
        repositionObject(benefitItem)
    }
}

function redrawScene(){

    const intervalVar = setInterval(function(){
        manageGameObjectCollision() // TODO: show alert to stop game if lives finished & then refresh page to restart

        sceneCleanUp()              
                  
        playerItem.continueMovement();        
        
        styleCanvas()                        
        backgroundImage.drawComponent()  
        playerItem.drawComponent()   
                
        livesText.text = `Lives: ${gameData.lives}`;
        livesText.redraw();

        scoreText.text = `Score: ${gameData.score}`
        scoreText.redraw();

        levelText.text = `Level: ${gameData.level}`
        levelText.redraw()



        manageHarmfulObjects()  
        manageBenefitObject()

        if(isGameOver()){
            gameOverText.text = `Game Over: reload & click start to play again`
            gameOverText.redraw()
            clearInterval(intervalVar)
        }        

    }, 19);  
    
    

}

// key was pressed
window.addEventListener('keydown', function (event) {    
    const keyCode = event.keyCode;

    switch(keyCode) {
        case 38:
            movePlayerUp();
            break;
        case 40:
            movePlayerDown();
            break;
        default:
            console.log('do nothing?')
    }    
})

// key was released
window.addEventListener('keyup', function (event) {
    haltPlayerMovement()
})

// redrawScene()

