import {
    Vector3,
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
        this.mesh = this.game.objectLoader.objects.druidcreep2.data.clone();

        this.initMesh();

        let scale = 0.025;
        this.mesh.scale.set(scale, scale, scale);
        this.mesh.position.set(settings.position.x, 0.1, settings.position.z);
        this.entity = new SteeringEntity(this.mesh);

        this.entity.loop = true;
        this.entity.thresholdRadius = 4;
        this.entity.maxSpeed = 0.2 + Math.random() * 0.1;
        this.entity.maxForce = 0.01 + Math.random() * 0.05;

        this.path = [];

        this.path.push(new Vector3(-30,0,-220));
        this.path.push(new Vector3(30,0,-220));
        this.path.push(new Vector3(30,0,-180));
        this.path.push(new Vector3(-30,0,-180));
    }

    initMesh(){
        this.mesh.traverse((obj) => {
            if(obj.name == 'Motor'){
                obj.material.shininess = 0;
                //obj.receiveShadow = true;
                obj.castShadow = true;
            }
        });
    }


    update(){
        // this.entity.maxSpeed = 0.2;
        // this.entity.maxForce = 0.01;

        // this.entity.wanderDistance = 2;
        // this.entity.wanderRadius = 4;
        // this.entity.wanderRange = 1;
        // this.entity.avoidDistance = 2;
        // this.entity.radius = 5;
        // this.entity.wander();
        // this.entity.avoid(this.game.controllers.creep.entities);
        // this.entity.lookWhereGoing(true);
        // this.entity.update();
        // this.mesh.position.copy(this.entity.position);

        this.entity.avoidDistance = 2;
        this.entity.radius = 3;

        
        this.entity.followPath(this.path, this.entity.loop, this.entity.thresholdRadius);
        this.entity.avoid(this.game.controllers.creep.entities);
        
        
        this.entity.lookWhereGoing(true);

        this.entity.update();
        this.mesh.position.copy(this.entity.position);
    }

}

export default DruidCreep;