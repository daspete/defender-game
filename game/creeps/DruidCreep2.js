import {
    Vector3,
    Object3D,
    ObjectLoader
} from 'three'

import MeshGenerator from '../generators/MeshGenerator'
import SteeringEntity from '../pathfinding/SteeringEntity'
import CreepStats from '../stats/CreepStats'

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

        this.entity.loop = false;
        this.entity.thresholdRadius = 2;
        this.entity.maxSpeed = 0.5;
        this.entity.maxForce = 0.5;

        this.path = [];

        let x = Math.round(-80 + Math.random() * 200);
        x = x % 2 == 0 ? x : x + 1;

        this.goal = new Vector3(x, 0, 10);

        this.path = this.game.pathfinder.FindPath(settings.position, this.goal);

        this.stats = new CreepStats(this.game, this);
    }

    initMesh(){
        this.mesh.traverse((obj) => {
            if(obj.name == 'Motor'){
                obj.material.shininess = 0;
                obj.castShadow = true;
            }
        });
    }

    UpdatePath(){
        this.path = this.game.pathfinder.FindPath(this.entity.position, this.goal);
        if(this.path){
            this.entity.pathIndex = 2;
        }
    }


    update(){
        if(this.entity.position.distanceTo(this.goal) < 10){
            this.stats.GoalArrived();
            return;
        }

        if(this.path){
            this.entity.followPath(this.path, this.entity.loop, this.entity.thresholdRadius);
            this.entity.lookWhereGoing(true);
            this.entity.update();
            this.mesh.position.copy(this.entity.position);
        }
    }

}

export default DruidCreep;