// spaceship.js
import * as THREE from "three";

export class Spaceship {
  constructor(scene) {
    this.scene = scene;
    this.tiltDirection = 0;
    this.createShip();
  }

  createShip() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.ship = new THREE.Mesh(geometry, material);
    this.scene.add(this.ship);
    this.ship.position.y = -3;
    this.ship.rotation.z = 0;
  }

  moveLeft() {
    console.log("moving left");
    this.ship.position.x -= 0.1;
    this.tiltDirection = 1;
  }

  moveRight() {
    console.log("moving right");
    this.ship.position.x += 0.1;
    this.tiltDirection = -1;
  }

  stopTilt() {
    this.tiltDirection = 0;
  }

  update() {
    // Smoothly interpolate ship rotation towards level position when no keys are pressed
    const targetRotation = this.tiltDirection === 0 ? 0 : Math.PI / 12 * this.tiltDirection;
    this.ship.rotation.z = THREE.MathUtils.lerp(this.ship.rotation.z, targetRotation, 0.1);

    // You can add additional logic here for continuous movement, etc.
  }
}
