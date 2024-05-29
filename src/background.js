import * as THREE from "three";
import { range } from "three/examples/jsm/nodes/Nodes.js";

let stars = [];
let asteroids = [];

export function createBackground(scene) {
    createStars(scene);
    createAsteroids(scene);
}
export function moveStarsAsteroids() {
  for (const star of stars) {
    star.position.z += 0.1; // Move stars towards the spaceship
    if (star.position.z > 0) {
      // Reset star position once it reaches the camera
      star.position.z = -100;
    }
  }

  for (const asteroid of asteroids) {
    asteroid.position.z += 0.8;
    asteroid.rotation.y -= 0.01;
    asteroid.rotation.x -= 0.01;
    if (asteroid.position.z > 0) {
      // Reset asteroid position once it reaches the camera
      asteroid.position.z = -5000;
    }
  }
}

function createStars(scene) {
  const starGeometry = new THREE.SphereGeometry(0.03, 10, 10);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let i = 0; i < 500; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const x = Math.random() * 50 - 25;
    const y = Math.random() * 50 - 25;
    const z = -Math.random() * 100;
    star.position.set(x, y, z);
    scene.add(star);
    stars.push(star);
  }
}

function createAsteroids(scene) {
  const asteroidGeometry = new THREE.TetrahedronGeometry(3, 2);
  const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0x43464b });

  for (let i = 0; i < 100; i++) {
    const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
    const x = Math.random() * 500 - 300;
    const y = Math.random() * 500 - 300;
    const z = -Math.random() * 5000; // Spread asteroids in z-direction
    asteroid.position.set(x, y, z);
    scene.add(asteroid);
    asteroids.push(asteroid);
  }
}
