// enemy ships
import * as THREE from "three";

export class EnemyShips {
    constructor (scene) {
        this.scene = scene;
        this.tracking();
        this.createFleet();
        this.rockets = [];
    }

    createFleet() {
        const geometry = new THREE.BoxGeometry(1,1,1);
        const material = new THREE.MeshBasicMaterial({ color: 0x17cc0e});
        this.fleet = new THREE.Mesh(geometry, material);
        this.scene.add(this.fleet[5]);
        this.fleet.position.set(.8,.8,.8);
    }

    tracking() {
        // code to position fleet in path of player ship
    }
}