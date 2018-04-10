import {
    Object3D,
    ObjectLoader
} from 'three'

import MeshGenerator from '../generators/MeshGenerator'
import SteeringEntity from '../pathfinding/SteeringEntity'

class BaseCreep {

    constructor(game, settings){
        this.game = game;
        this.settings = settings;

        this.mesh = MeshGenerator.Cube({
            width: 1,
            height: 4,
            depth: 1,
            material: {
                color: 0xff0000,
            },
            shadow: {
                cast: true,
                receive: true
            }
        });

        this.mesh.position.set(settings.position.x, 0, settings.position.z);

        this.entity = new SteeringEntity(this.mesh);
    }



}

export default BaseCreep;