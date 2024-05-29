import * as THREE from "three";
import { Spaceship } from "./spaceship.js";
import { createBackground, moveStarsAsteroids } from "./background.js";

let scene, camera, renderer, spaceship, enemyShips = [];

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // background
  createBackground(scene);

  // player spaceship
  spaceship = new Spaceship(scene);

  camera.position.z = 5;

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  moveStarsAsteroids();
  spaceship.update();

  renderer.render(scene, camera);
}

const keys = {};
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;

  if (keys["ArrowLeft"] && keys["ArrowRight"]) {
    // Both left and right keys pressed simultaneously, stop tilting
    spaceship.stopTilt();
  } else if (keys["ArrowLeft"]) {
    spaceship.moveLeft();
  } else if (keys["ArrowRight"]) {
    spaceship.moveRight();
  } else if (keys["ArrowUp"]) {
    spaceship.moveUp();
  } else if (keys["ArrowDown"]) {
    spaceship.moveDown();
  }

  if (keys[" "]) {
    // Space key for shooting
    spaceship.shoot();
  }
});

document.addEventListener("keyup", (event) => {
  delete keys[event.key];

  if (!keys["ArrowLeft"] && !keys["ArrowRight"]) {
    // No movement keys pressed, stop tilting
    spaceship.stopTilt();
  }
});

init();
