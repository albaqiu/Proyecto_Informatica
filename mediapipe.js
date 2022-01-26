window.onload = function() {
    mediapipe()
};

function mediapipe() {

    //Declaración de variables, recoje los elementos del dom
    const videoElement = document.getElementsByClassName('input_video')[0];
    const canvasElement = document.getElementsByClassName('output_canvas')[0];
    canvasElement.height = window.innerHeight
    canvasElement.width = window.innerWidth
    const canvasCtx = canvasElement.getContext('2d');
    const landmarkContainer = document.getElementsByClassName('landmark-grid-container')[0];
    // const grid = new LandmarkGrid(landmarkContainer);
    var coordX = Math.random() * window.innerWidth
    var coordY = Math.random() * window.innerHeight
    var touched = false
    const hands = [16, 17, 18, 19, 20, 21, 22]
    var posicion

    // Funcion que se corre en bucle
    function onResults(results) {
        // Si no hay resultados devueltos no seguir ejecutando
        if (!results.poseLandmarks) {
            //     grid.updateLandmarks([]);
            return;
        }

        canvasElement.height = window.innerHeight
        canvasElement.width = window.innerWidth
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        //canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);
        // Only overwrite existing pixels.
        canvasCtx.globalCompositeOperation = 'source-in';
        canvasCtx.fillStyle = '#00FF00';
        //canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
        // Only overwrite missing pixels.
        canvasCtx.globalCompositeOperation = 'destination-atop';
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.globalCompositeOperation = 'source-over';
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#1c6e14', lineWidth: 5 });
        drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#f0a00d', lineWidth: 1 });

        //posicion = conversion(results.poseLandmarks[16].x, results.poseLandmarks[16].y, window.innerWidth, window.innerHeight);

        // Juego
        hands.forEach(element => {
            posicion = conversion(results.poseLandmarks[element].x, results.poseLandmarks[element].y, window.innerWidth, window.innerHeight)
        });
        if (touched) {
            drawCircle(canvasCtx, coordX, coordY, 0)
        } else {
            drawCircle(canvasCtx, coordX, coordY, 20)

            posicion.x = Math.round(posicion.x)
            coordX = Math.round(coordX)
            posicion.y = Math.round(posicion.y)
            coordY = Math.round(coordY)

            let thresholdX = posicion.x / coordX
            let thresholdY = posicion.y / coordY
            let min = 0.9
            let max = 1.1
            if (thresholdX > min && thresholdX < max && thresholdY > min && thresholdY < max) {
                console.log("SII")
                touched = true
            } else {
                console.log("NOO")
            }

        }





        //console.log("X", Math.round(results.poseLandmarks[0].x * 1280), "Y", Math.round(results.poseLandmarks[0].y * 720))
        // var puntos = conversion(results.poseLandmarks)
        // dibujarCirculo(canvasCtx, results.poseLandmarks, puntos.x, puntos.y)
        //console.log("X", puntos.x, "Y", puntos.y)




        canvasCtx.restore();
        // grid.updateLandmarks(results.poseWorldLandmarks);
    }


    //Creación del objeto pose instanciado de mediapipe
    const pose = new Pose({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
    });

    //Configuración de el objeto pose
    pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    //Llamada de la función que corre en bucle
    pose.onResults(onResults);

    //Creación de el objeto camara
    const camera = new Camera(videoElement, {
        onFrame: async() => {
            await pose.send({ image: videoElement });
        },
        width: window.innerWidth,
        height: window.innerHeight
    });
    //Inicia la camara
    camera.start();

}