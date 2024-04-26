import * as THREE from "three";

let stars = [];

export function createBackground(scene) {
    createStars(scene);
}

function createStars(scene) {
  const starGeometry = new THREE.SphereGeometry(0.05, 10, 10);
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

export function moveStars() {
  for (const star of stars) {
    star.position.z += 0.1; // Move stars towards the spaceship
    if (star.position.z > 0) {
      // Reset star position once it reaches the camera
      star.position.z = -100;
    }
  }
}
