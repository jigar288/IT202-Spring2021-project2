// ! convert all functions into ES6 syntax

const canvasElement = document.querySelector('canvas'); 
const canvasContext = canvasElement.getContext('2d'); 

function styleCanvas(){
    const canvasBackgroundColor = "#f1f1f1";
    canvasContext.fillStyle = canvasBackgroundColor;
    canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);    
}

styleCanvas()

function gameItem(itemHeight, itemWidth, xPosition, yPosition, itemColor, itemType){

    this.height = itemHeight
    this.width = itemWidth
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.itemType = itemType
    this.yAxisMoveRate = 0;

    switch(itemType) {
        case 'image':
          this.imageObj = new Image(); //create a new image
          this.imageObj.src = itemColor;
          break;
        default:
          console.log('do nothing?')
    }

    this.drawComponent = () => {
        if(itemType == 'image'){
            canvasContext.imageSmoothingEnabled = true;
            canvasContext.drawImage(this.imageObj, this.xPosition, this.yPosition, this.width, this.height);
        }
    }

    this.continueMovement = () => {
        this.yPosition += this.yAxisMoveRate
    }
    
}

const playerItem = new gameItem(20, 25, 20, 60, './assets/airplane_2708.png', 'image');

function sceneCleanUp(){
    var canvas = document.getElementById('gameCanvas');
    var width = canvas.width;
    var height = canvas.height;    
    canvasContext.clearRect(0, 0, width, height)
}

function redrawScene(){


    setInterval(function(){
        sceneCleanUp()        
        playerItem.continueMovement();
        styleCanvas()                
        playerItem.drawComponent()        
        // archerImage.xPosition = archerImage.xPosition + 1
    }, 20);    

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

// key was pressed
window.addEventListener('keydown', function (event) {
    if(event.keyCode == 38){
        movePlayerUp()
    }else if(event.keyCode == 40){
        movePlayerDown()
    }
})

// key was released
window.addEventListener('keyup', function (event) {
    haltPlayerMovement()
})

down = 40
up = 38

redrawScene()

