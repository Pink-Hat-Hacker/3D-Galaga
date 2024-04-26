import * as THREE from "three";
import { Spaceship } from "./spaceship.js";
import { EnemyShip } from "./enemyship.js";
import { createBackground, moveStars } from "./background.js";

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

  // Add enemy ships
  const spawnPoints = [
    new THREE.Vector3(-5, 0, -20),
    new THREE.Vector3(5, 0, -20),
    // Add more spawn points as needed
  ];

  for (const spawnPoint of spawnPoints) {
    const enemyShip = new EnemyShip(scene, spawnPoint, spaceship.ship);
    enemyShips.push(enemyShip);
  }

  // player spaceship
  spaceship = new Spaceship(scene);

  camera.position.z = 5;

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  moveStars();
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
