import {
    Raycaster,
    Vector3
} from 'three'

import MeshGenerator from '../generators/MeshGenerator'

class GroundCaster {

    constructor(game){
        this.game = game;

        this.raycaster = new Raycaster();

        this.ground = MeshGenerator.Plane({
            width: 1000,
            height: 1000,
            material: {
                visible: false
            }
        });

        this.movePosition = new Vector3();
        this.touchPosition = new Vector3();

        this.game.scene.add(this.ground);

        this.game.events.on('mousemove', (position) => { this.OnMouseMove(position) });
        this.game.events.on('mousedown', (result) => { this.OnMouseDown(result) });
    }

    OnMouseMove(position){
        this.raycaster.setFromCamera(position, this.game.controllers.camera.camera);

        let intersects = this.raycaster.intersectObjects([this.ground]);

        let gridSize = 4;

        if(intersects.length > 0){
            this.movePosition.copy(intersects[0].point).add(intersects[0].face.normal);
            this.movePosition.divideScalar(gridSize).floor().multiplyScalar(gridSize).addScalar(gridSize * 0.5);

            this.game.events.emit('ground.hit.move', this.movePosition);
        }
    }

    OnMouseDown(result){
        this.raycaster.setFromCamera(result.position, this.game.controllers.camera.camera);

        let intersects = this.raycaster.intersectObjects([this.ground]);

        let gridSize = 4;

        if(intersects.length > 0){
            this.touchPosition.copy(intersects[0].point).add(intersects[0].face.normal);
            this.touchPosition.divideScalar(gridSize).floor().multiplyScalar(gridSize).addScalar(gridSize * 0.5);

            if(result.button == 1){
                this.game.events.emit('ground.hit.touch', this.touchPosition);
            }else if(result.button == 3){
                this.game.events.emit('ground.hit.touchright', this.touchPosition);
            }
        }
    }



}

export default GroundCaster;