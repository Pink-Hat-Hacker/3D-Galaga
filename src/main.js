import * as THREE from "three";
import { Spaceship } from "./spaceship.js";

let scene, camera, renderer, spaceship, stars = [];

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
  
  createStars();
  spaceship = new Spaceship(scene);

  camera.position.z = 5;

  animate();
}

function createStars() {
  const starGeometry = new THREE.SphereGeometry(0.02, 10, 10);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let i = 0; i < 100; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const x = Math.random() * 20 - 10;
    const y = Math.random() * 20 - 10;
    const z = -Math.random() * 100; // Stars spread in z-direction
    star.position.set(x, y, z);
    scene.add(star);
    stars.push(star);
  }
}

function moveStars() {
  for (const star of stars) {
    star.position.z += 0.1; // Move stars towards the spaceship
    if (star.position.z > 0) {
      // Reset star position once it reaches the camera
      star.position.z = -100;
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  spaceship.update();
  moveStars();
  renderer.render(scene, camera);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      spaceship.moveLeft();
      setTimeout(()=>{spaceship.stopTilt()}, 500);
    } else if (event.key === 'ArrowRight') {
      spaceship.moveRight();
      setTimeout(()=>{spaceship.stopTilt()}, 500);
    }
  });

init();
