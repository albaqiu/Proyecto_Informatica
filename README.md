# On the Spot

A browser game that turns your webcam into an exercise controller. Targets appear at random places on the screen and you move your body to touch them with your hands. Every hit scores a point.

It was built as a school computing project (January and February 2022). The interface is in Spanish.

## Purpose

The goal of On the Spot is to make physical activity fun, so that people can make it part of their daily routine. It is designed with a therapeutic use in mind: the game is simple, suitable for all ages and needs no equipment beyond a webcam. Patients can use the score counter to track their progress and aim for the number of points recommended by their doctor or physiotherapist, turning prescribed exercise into a game they want to come back to.

## How it works

1. The webcam feed is processed in real time by **[MediaPipe Pose](https://developers.google.com/mediapipe/solutions/vision/pose_landmarker)**, which detects 33 body landmarks.
2. The skeleton is drawn over the video on a full-screen `<canvas>`.
3. An orange target appears at a random position on the screen.
4. The game tracks the hand landmarks (wrists, pinkies, index fingers and thumbs, landmarks 16 to 22). When one of them reaches the target, the player scores a point, a sound plays and a new target appears.
5. The score is shown on screen, with background music during play.

All processing happens in the browser. No video is stored or sent anywhere.

## Pages

| Page | Purpose |
|---|---|
| `paginaPrueba.html` | Home page with **JUGAR** (play) and **INSTRUCCIONES** (instructions) buttons |
| `paginaJuego.html` | The game: camera, skeleton overlay, targets, score and **SALIR** (exit) button |
| `instruccionesBuenas.html` | How to play |

## Project structure

```
├── paginaPrueba.html           Home page (entry point)
├── paginaJuego.html            Game page
├── instruccionesBuenas.html    Instructions page
├── mediapipe.js                Camera setup, pose detection and main game loop
├── utils.js                    Helpers: draw targets, random positions, hit detection, score
├── cssPrueba.css               Styles for the home and game pages
├── cssinstruccionesBuenas.css  Styles for the instructions page
├── audios/                     Background music and sound effects
├── imagenes/                   Favicon
└── IMG_4970.PNG                Watercolor decoration (currently unused)
```

## How to run

You need a webcam and a modern browser (Chrome or Edge recommended). MediaPipe is loaded from a CDN, so an internet connection is also required.

The browser only gives camera access to pages served from `localhost` or HTTPS, so run a local server instead of opening the files directly:

```bash
git clone https://github.com/albaqiu/Proyecto_Informatica.git
cd Proyecto_Informatica
python3 -m http.server 8000
```

Open <http://localhost:8000/paginaPrueba.html>, click **JUGAR** and allow camera access. Stand back far enough for the camera to see your upper body.

## Built with

- HTML, CSS and vanilla JavaScript
- [MediaPipe Pose](https://www.npmjs.com/package/@mediapipe/pose), with `camera_utils` and `drawing_utils`

## Authors

Alba Qiu and Mireia Pérez
