import {
    Raycaster,
    Vector2,
    Vector3
} from 'three'

import MeshGenerator from '../generators/MeshGenerator'



class GroundCaster {

    constructor(game){
        this.game = game;

        this.raycaster = new Raycaster();

        this.plane = MeshGenerator.Plane({
            width: 1000,
            height: 1000,
            material: {
                visible: false
            }
        });

        this.game.scene.add(this.plane);

        this.game.events.on('mousemove', (position) => { this.OnMouseMove(position) });
    }

    OnMouseMove(position){
        this.raycaster.setFromCamera(position, this.game.camera);

        let intersects = this.raycaster.intersectObjects([this.plane]);

        if(intersects.length > 0){
            let intersect = intersects[0];

            let _position = new Vector3();

            _position.copy(intersect.point).add(intersect.face.normal);
            _position.divideScalar(2).floor().multiplyScalar(2).addScalar(1);

            this.game.events.emit('ground.hit', _position);
        }
    }



}

export default GroundCaster;