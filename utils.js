window.onload = function () {
    mediapipe()
};



function mediapipe() {

    const videoElement = document.getElementsByClassName('input_video')[0];
    const canvasElement = document.getElementsByClassName('output_canvas')[0];
    const canvasCtx = canvasElement.getContext('2d');
    const landmarkContainer = document.getElementsByClassName('landmark-grid-container')[0];
    // const grid = new LandmarkGrid(landmarkContainer);

    function onResults(results) {
        //console.log(results)
        if (!results.poseLandmarks) {
            //     grid.updateLandmarks([]);
            return;
        }

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
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#FFFFFF', lineWidth: 1 });
        drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#000000', lineWidth: 1 });


        //console.log("X", Math.round(results.poseLandmarks[0].x * 1280), "Y", Math.round(results.poseLandmarks[0].y * 720))
        var puntos = conversion(results.poseLandmarks)

        dibujarCirculo(canvasCtx, results.poseLandmarks, puntos.x, puntos.y)

        console.log("X", puntos.x, "Y", puntos.y)

        canvasCtx.restore();

        // grid.updateLandmarks(results.poseWorldLandmarks);
    }
    function conversion(poseLandmarks) {
        var convertedPoseLandmark = { x: 0, y: 0 }

        convertedPoseLandmark.x = poseLandmarks[0].x * 1280
        convertedPoseLandmark.y = poseLandmarks[0].y * 720

        return convertedPoseLandmark

    }

    function dibujarCirculo(canvasCtx, poseLandmarks, x, y) {
        canvasCtx.beginPath();
        canvasCtx.arc(x, y, 50, 0, 2 * Math.PI);
        canvasCtx.stroke();
    }

    const pose = new Pose({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
    });

    pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    pose.onResults(onResults);


    const camera = new Camera(videoElement, {
        onFrame: async () => {
            await pose.send({ image: videoElement });
        },
        width: 1280,
        height: 720
    });
    camera.start();

}