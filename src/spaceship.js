// spaceship.js
import * as THREE from "three";

export class Spaceship {
  constructor(scene) {
    this.scene = scene;
    this.tiltDirection = 0;
    this.createShip();
    this.lasers = [];
  }

  createShip() {
    const geometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.ship = new THREE.Mesh(geometry, material);
    this.scene.add(this.ship);
    this.ship.position.y = -3;
    this.ship.rotation.z = 0;

    // Initialize ship rotation
    if (this.ship) {
      this.ship.rotation.z = 0;
    }
  }

  moveLeft() {
    console.log("moving left");
    this.ship.position.x -= 0.5;
    this.tiltDirection = 1;
  }

  moveRight() {
    console.log("moving right");
    this.ship.position.x += 0.5;
    this.tiltDirection = -1;
  }

  moveUp() {
    console.log("moving up");
    this.ship.position.y += 0.5;
  }

  moveDown() {
    console.log("moving down");
    this.ship.position.y -= 0.5;
  }

  stopTilt() {
    this.tiltDirection = 0;
  }

  shoot() {
    const laserGeometry = new THREE.BoxGeometry(0.1, 0.1, 1);
    const laserMaterial = new THREE.MeshBasicMaterial({ color: 0xff1000 });
    const laser = new THREE.Mesh(laserGeometry, laserMaterial);
    laser.position.copy(this.ship.position);
    laser.position.z -= 1; // Move laser in front of the ship
    this.scene.add(laser);
    this.lasers.push(laser);
  }

  update() {
    // Smoothly interpolate ship rotation towards level position when no keys are pressed
    const targetRotation =
      this.tiltDirection === 0 ? 0 : (Math.PI / 12) * this.tiltDirection;
    this.ship.rotation.z = THREE.MathUtils.lerp(
      this.ship.rotation.z,
      targetRotation,
      0.1
    );

    // Update lasers
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i];
      laser.position.z -= 0.2; // Move lasers forward
      if (laser.position.z < -50) {
        // Remove lasers that have gone out of view
        this.scene.remove(laser);
        this.lasers.splice(i, 1);
      }
    }
  }
}
