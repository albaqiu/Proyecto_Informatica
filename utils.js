   function colorAleatorio() {
       var r = Math.round(Math.random() * 255);
       var g = Math.round(Math.random() * 255);
       var b = Math.round(Math.random() * 255);
       return "rgb(" + r + "," + g + "," + b + ")";
   }

   function crearCirculo(x, y, radio, color) {
       var circle = new createjs.Shape();
       circle.graphics.beginFill(color);
       circle.graphics.drawCircle(0, 0, radio);
       circle.x = x;
       circle.y = y;
       return circle;
   }

   function init() {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
       crearCirculosAleatorios();
   }

   function crearCirculosAleatorios() {
       var circle_temp;
       var x, y, r, color;
       var width = stage.canvas.width;
       var height = stage.canvas.height;

       for (var i = 0; i < 300; i++) {
           x = Math.random() * width;
           y = Math.random() * height;
           r = Math.random() * 50;
           color = colorAleatorio();
           circle_temp = crearCirculo(x, y, r, color);
           stage.addChild(circle_temp);
       }
       stage.update();
   }

   function dibujarCirculo(canvasCtx, poseLandmarks, x, y) {
       canvasCtx.beginPath();
       //     canvasCtx.arc(x, y, 70, 0, 40 * Math.PI);
       canvasCtx.stroke();
   }

   function drawCircle(canvasCtx, coordX, coordY, radius = 20) {

       canvasCtx.beginPath();
       canvasCtx.arc(coordX, coordY, radius, 0, 2 * Math.PI, false);
       canvasCtx.fillStyle = 'red';
       canvasCtx.fill();
       canvasCtx.lineWidth = 5;
       canvasCtx.strokeStyle = '#AA8898';
       canvasCtx.stroke();
   }


   function conversion(x, y, width, height) {
       var convertedPoseLandmark = { x: 0, y: 0 }
       convertedPoseLandmark.x = x * width
       convertedPoseLandmark.y = y * height
       return convertedPoseLandmark
   }