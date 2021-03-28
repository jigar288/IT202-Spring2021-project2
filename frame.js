let countFrames = 0;

function checkFrame(currentFrameNumber){
    if( (countFrames/currentFrameNumber) % 1 == 0)
        return true
    else
        return false
}

function incrementFrameCount(){
    countFrames = countFrames + 1
}