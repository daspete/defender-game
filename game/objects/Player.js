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

        this.game.events.on('ground.hit', (position) => {
            this.gameObject.position.copy(position);
        });
    }

    Update(){

    }

}

export default Player;