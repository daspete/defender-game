import {
    Vector3,
    Object3D,
    ObjectLoader
} from 'three'

import TweenMax from 'gsap'

import BaseCreep from '../creeps/BaseCreep'

class CreepController {

    constructor(game){
        this.game = game;

        this.creeps = [];
        this.entities = [];
    }

    SpawnCreep(settings){
        if(this.creeps.length > 50) return;
        let x = Math.round(-100 + Math.random() * 200);
        let z = Math.round(-300 + Math.random() * 200);
        x = x % 2 == 0 ? x : x + 1;
        
        let creep = new BaseCreep(this.game, {
            position: new Vector3(x, 0, z)
        });

        this.game.scene.add(creep.mesh);

        this.creeps.push(creep);
        this.entities.push(creep.entity);
    }

    Update(){
        this.creeps.forEach(({mesh, entity}) => {
            entity.maxSpeed = 0.2;
            entity.maxForce = 0.01;

            entity.wanderDistance = 2;
            entity.wanderRadius = 2;
            entity.wanderRange = 1;
            entity.avoidDistance = 2;
            entity.radius = 3;
            entity.wander();
            entity.avoid(this.entities);
            entity.lookWhereGoing(true);
            entity.update();
            mesh.position.copy(entity.position);
        });
    }

}

export default CreepController;