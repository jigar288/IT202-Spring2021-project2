class gameItem {
    constructor(itemHeight, itemWidth, xPosition, yPosition, itemFilePath, itemType, xAxisMoveRate) {

        this.itemHeight = itemHeight;
        this.itemWidth = itemWidth;

        this.xPosition = xPosition;
        this.yPosition = yPosition;

        this.itemType = itemType;
        this.yAxisMoveRate = 0;
        this.xAxisMoveRate = xAxisMoveRate;

        switch (itemType) {
            case 'img':
                this.imageObj = new Image(); //create a new image
                this.imageObj.src = itemFilePath;
                break;
            default:
                console.log('do nothing?');
        }

        this.drawComponent = () => {
            if (itemType == 'img') {
                canvasContext.imageSmoothingEnabled = true;
                canvasContext.drawImage(this.imageObj, this.xPosition, this.yPosition, this.itemWidth, this.itemHeight);
            }
        };

        this.continueMovement = () => {
            this.yPosition += this.yAxisMoveRate;
        };

    }
}