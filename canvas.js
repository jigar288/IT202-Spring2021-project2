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
            canvasContext.drawImage(this.imageObj, this.xPosition, this.yPosition, this.width, this.height);
        }
    }
    
}

const archerImage = new gameItem(25, 25, 60, 60, './assets/archer.png', 'image');

function sceneCleanUp(){
    var canvas = document.getElementById('gameCanvas');
    var width = canvas.width;
    var height = canvas.height;    
    canvasContext.clearRect(0, 0, width, height)
}

function redrawScene(){


    setInterval(function(){
        sceneCleanUp()
        archerImage.drawComponent()
    }, 20);    

}

redrawScene()

