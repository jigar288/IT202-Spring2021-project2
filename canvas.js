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
    return Math.floor(Math.random()*(125-0+1)+0);
}


const playerItem = new gameItem(20, 25, 20, 60, './assets/airplane_2708.png', 'img');



let harmfulItemsList = []

function addHarmObjects(amountOfHarmObjs){
    let i;
    for(i = 0; i < amountOfHarmObjs; i++){
        const randomYPosition = getRandomYPosition()
        const harmfulItem = new gameItem(25, 25, 300, randomYPosition, './assets/missle.png', 'img');
        harmfulItemsList.push(harmfulItem)
        
    }
}

addHarmObjects(3)

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

function rePositionHarmObj(harmObj){
    harmObj.xPosition = 300; //reset x position to right side of canvas
    harmObj.yPosition = getRandomYPosition(); // pick a random y position in range
    harmObj.xAxisMoveRate += getRandomSpeedInRange(); //make the object speed faster as game progresses
}


function manageGameObjectCollision(harmfulItem){    
    let i;
    for(i = 0; i < harmfulItemsList.length; i++){
        const harmfulItem = harmfulItemsList[i]
        if(areObjectsColliding(playerItem, harmfulItem)){
            rePositionHarmObj(harmfulItem)
            decrementLives();
            if(isGameOver()){
                alert('Game Over!!!!')
            }
        }     
    }    
    
}

function getRandomSpeedInRange(){
    return Math.floor(Math.random()*(0.3-0.1+1));
}

function manageHarmfulObjects(){
    let i;
    for(i = 0; i < harmfulItemsList.length; i++){
        moveHarmObjectLeft(i)
        harmfulItemsList[i].drawComponent()        

        if(harmfulItemsList[i].xPosition <= -30){
            rePositionHarmObj(harmfulItemsList[i])
        }        
    }
}

// 

/**
 * 
 * pick a range to respawn: 
 *  min y = 125, max y = 0
 * 
 * min x = 
 * max x = 
 * 
 * canvas size is width (x): 300 height(y): 150
 * 
 * re-position when x = less than -30
 * 
 * TODO: complete nice to have tasks
 * 
 * ? Nice to have
 * - start at random speeds in a range
 * - ensure that two harm objects don't have same y position based on height of item
 * 
 */
// manually create a few objects & reposition them after they go out of bounds
function redrawScene(){

    setInterval(function(){
        manageGameObjectCollision() // TODO: show alert to stop game if lives finished & then refresh page to restart
        

        sceneCleanUp()                        
        playerItem.continueMovement();        
        styleCanvas()                        
        playerItem.drawComponent()      

        // TODO: change the time that each object appears so they don't move in sync
        manageHarmfulObjects()  

      
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

redrawScene()

