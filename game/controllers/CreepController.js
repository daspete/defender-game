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
        for(let i = 0; i < this.creeps.length; i++){
            this.creeps[i].entity.maxSpeed = 0.2;
            this.creeps[i].entity.maxForce = 0.01;

            this.creeps[i].entity.wanderDistance = 2;
            this.creeps[i].entity.wanderRadius = 2;
            this.creeps[i].entity.wanderRange = 1;
            this.creeps[i].entity.avoidDistance = 2;
            this.creeps[i].entity.radius = 3;
            this.creeps[i].entity.wander();
            this.creeps[i].entity.avoid(this.entities);
            this.creeps[i].entity.lookWhereGoing(true);
            this.creeps[i].entity.update();
            this.creeps[i].mesh.position.copy(this.creeps[i].entity.position);
        }
    }

}

export default CreepController;