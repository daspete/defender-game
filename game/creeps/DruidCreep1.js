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
        this.mesh = this.game.objectLoader.objects.druidcreep1.data.clone();

        this.initMesh();

        let scale = 0.025;
        this.mesh.scale.set(scale, scale, scale);
        this.mesh.position.set(settings.position.x, 0.1, settings.position.z);
        this.entity = new SteeringEntity(this.mesh);

        this.entity.loop = true;
        this.entity.thresholdRadius = 2;
        this.entity.maxSpeed = 0.2;// + Math.random() * 0.1;
        this.entity.maxForce = 0.01;// + Math.random() * 0.05;

        this.path = [];

        this.path = this.game.pathfinder.FindPath(settings.position, new Vector3(-98, 0, 500));
    }

    initMesh(){
        this.mesh.traverse((obj) => {
            if(obj.name == 'Body'){
                obj.material.shininess = 0;
                //obj.receiveShadow = true;
                obj.castShadow = true;
            }
        });
    }

    UpdatePath(){
        this.path = this.game.pathfinder.FindPath(this.entity.position, new Vector3(-98, 0, 500));
        this.entity.pathIndex = 2;
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
        // 
        // this.entity.lookWhereGoing(true);

        // this.entity.avoidDistance = 2;
        // this.entity.radius = 3;

        if(this.path){
            this.entity.followPath(this.path, this.entity.loop, this.entity.thresholdRadius);
        }
        
        //this.entity.avoid(this.game.controllers.creep.entities);
        
        
        this.entity.lookWhereGoing(true);

        this.entity.update();
        this.mesh.position.copy(this.entity.position);
    }

}

export default DruidCreep;