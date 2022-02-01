function drawCircle(canvasCtx, coordX, coordY, radius = 20) {
    canvasCtx.beginPath();
    canvasCtx.arc(coordX, coordY, radius, 0, 2 * Math.PI, false);
    canvasCtx.fillStyle = 'lightblue';
    canvasCtx.shadowBlur = 30;
    canvasCtx.fill();
    canvasCtx.strokeStyle = 'lightblue';
    canvasCtx.stroke();
}

function conversion(x, y, width, height) {
    var convertedPoseLandmark = { x: 0, y: 0 }
    convertedPoseLandmark.x = Math.round(x * width)
    convertedPoseLandmark.y = Math.round(y * height)
    return convertedPoseLandmark
}

function juego(hands, canvasCtx, coordX, coordY, results, touched) {
    hands.forEach(element => {
        posicion = conversion(results.poseLandmarks[element].x, results.poseLandmarks[element].y, window.innerWidth, window.innerHeight)
            //console.log(coordX, posicon.x, coordY, posicion.y)
        let thresholdX = posicion.x / coordX
        let thresholdY = posicion.y / coordY
        let min = 0.9
        let max = 1.1
        if (thresholdX > min && thresholdX < max && thresholdY > min && thresholdY < max) {
            touched = true
        } else {
            console.log('NOP')
        }
    });

    return touched
}


function getRandomCoord() {
    var randomPoints = { x: 0, y: 0 }
    var xRemoved = 250
    var yRemoved = 150

    //console.log("min x, y", xRemoved, yRemoved)
    //console.log("max x, y", window.innerWidth - xRemoved, window.innerHeight - yRemoved)

    // for (const x of Array(20).keys()) {
    //     console.log(Math.round(Math.random() * (window.innerWidth - xRemoved) + xRemoved))
    // }

    randomPoints.x = Math.round(Math.random() * (window.innerWidth - xRemoved) + xRemoved / 2)
    randomPoints.y = Math.round(Math.random() * (window.innerHeight - yRemoved) + yRemoved / 2)

    return randomPoints
}