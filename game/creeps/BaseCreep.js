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

    update(){
        this.entity.maxSpeed = 0.2;
        this.entity.maxForce = 0.01;

        this.entity.wanderDistance = 2;
        this.entity.wanderRadius = 2;
        this.entity.wanderRange = 1;
        this.entity.avoidDistance = 2;
        this.entity.radius = 3;
        this.entity.wander();
        this.entity.avoid(this.game.controllers.creep.entities);
        this.entity.lookWhereGoing(true);
        this.entity.update();
        this.mesh.position.copy(this.entity.position);
    }

}

export default BaseCreep;