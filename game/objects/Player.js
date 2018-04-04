import {
    Raycaster,
    Vector2,
    Vector3
} from 'three'

import MeshGenerator from '../generators/MeshGenerator'



class Player {

    constructor(game){
        this.game = game;

        this.gameObject = MeshGenerator.Cube({
            width: 1,
            height: 1,
            depth: 1,
            material: {
                color: 0xff0000,
            }
            
        });
        this.gameObject.position.set(0,0,0);

        this.game.scene.add(this.gameObject);

        this.raycaster = new Raycaster();
        this.mousePosition = new Vector2();

        this.plane = MeshGenerator.Plane({
            width: 1000,
            height: 1000,
            material: {
                visible: false
            }
        });

        this.game.scene.add(this.plane);

        this.game.events.on('mousemove', (position) => {
            this.raycaster.setFromCamera(position, this.game.camera);

            let intersects = this.raycaster.intersectObjects([this.plane]);

            if(intersects.length > 0){
                let intersect = intersects[0];

                this.gameObject.position.copy(intersect.point).add(intersect.face.normal);
                this.gameObject.position.divideScalar(2).floor().multiplyScalar(2).addScalar(1);
            }
        });
    }

    Update(){

    }

    OnMouseDown(e){

    }

    OnMouseMove(e){
        e.preventDefault();

        this.mousePosition.set(
            (e.clientX / this.game.settings.width) * 2 - 1,
            -(e.clientY / this.game.settings.height) * 2 + 1
        );

        this.raycaster.setFromCamera(this.mousePosition, this.game.camera);

        let intersects = this.raycaster.intersectObjects([this.plane]);

        if(intersects.length > 0){
            let intersect = intersects[0];

            this.gameObject.position.copy(intersect.point).add(intersect.face.normal);
            this.gameObject.position.divideScalar(2).floor().multiplyScalar(2).addScalar(1);
        }
    }

}

export default Player;