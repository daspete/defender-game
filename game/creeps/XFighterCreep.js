import {
    Object3D,
    ObjectLoader
} from 'three'

import MeshGenerator from '../generators/MeshGenerator'
import SteeringEntity from '../pathfinding/SteeringEntity'

class DruidCreep {

    constructor(game, settings){
        this.game = game;
        this.settings = settings;
        this.ready = false;    
        this.mesh = this.game.objectLoader.objects.xfighter.data.clone();

        this.initMesh();

        let scale = 0.025;
        this.mesh.scale.set(scale, scale, scale);
        this.mesh.position.set(settings.position.x, 0.5, settings.position.z);
        this.entity = new SteeringEntity(this.mesh);
    }

    initMesh(){
        this.mesh.traverse((obj) => {
            if(obj.name == 'Wing 0' || obj.name == 'Wing 1'){
                obj.material.shininess = 0;
                //obj.receiveShadow = true;
                obj.castShadow = true;
            }
        });
    }


    update(){
        this.entity.maxSpeed = 0.2;
        this.entity.maxForce = 0.01;

        this.entity.wanderDistance = 2;
        this.entity.wanderRadius = 4;
        this.entity.wanderRange = 1;
        this.entity.avoidDistance = 2;
        this.entity.radius = 5;
        this.entity.wander();
        this.entity.avoid(this.game.controllers.creep.entities);
        this.entity.lookWhereGoing(true);
        this.entity.update();
        this.mesh.position.copy(this.entity.position);
    }

}

export default DruidCreep;