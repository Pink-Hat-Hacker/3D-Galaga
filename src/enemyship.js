// enemyship.js
import * as THREE from 'three';

export class EnemyShip {
  constructor(scene, spawnPoint, targetShip) {
    this.scene = scene;
    this.spawnPoint = spawnPoint;
    this.targetShip = targetShip;
    this.state = 'entrance';
    this.speed = 0.05;
    this.createShip();
    this.enterSequence();
  }

  createShip() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.ship = new THREE.Mesh(geometry, material);
    this.ship.position.copy(this.spawnPoint);
    this.scene.add(this.ship);
  }

  enterSequence() {
    // Move towards the center of the screen
    const targetPosition = new THREE.Vector3(0, 0, -10);
    const distance = this.spawnPoint.distanceTo(targetPosition);
    this.direction = targetPosition.clone().sub(this.spawnPoint).normalize();
    this.moveDistance = distance;
    this.state = 'movingToCenter';
  }

  update() {
    if (this.state === 'movingToCenter') {
      // Move towards the center of the screen
      this.ship.position.add(this.direction.clone().multiplyScalar(this.speed));
      this.moveDistance -= this.speed;
      if (this.moveDistance <= 0) {
        // Transition to attacking state once at the center
        this.state = 'attacking';
      }
    } else if (this.state === 'attacking') {
      // Move towards the target ship
      const directionToTarget = this.targetShip.position.clone().sub(this.ship.position).normalize();
      this.ship.position.add(directionToTarget.clone().multiplyScalar(this.speed));
    }
  }

  shoot() {
    // Implement shooting behavior towards the target ship
    // You can add the logic for creating and moving laser projectiles
  }

  returnToSpawn() {
    // Return to the spawn point when behind the target ship
    const distanceToSpawn = this.ship.position.distanceTo(this.spawnPoint);
    if (distanceToSpawn > 0.1) {
      const directionToSpawn = this.spawnPoint.clone().sub(this.ship.position).normalize();
      this.ship.position.add(directionToSpawn.clone().multiplyScalar(this.speed));
    } else {
      // Reset state to entrance if returned to spawn point
      this.state = 'entrance';
      this.enterSequence();
    }
  }
}
