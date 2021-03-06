import {
    Vector3,
    Object3D,
    ObjectLoader
} from 'three'

import BaseCreep from '../creeps/BaseCreep'

import DruidCreep1 from '../creeps/DruidCreep1'
import DruidCreep2 from '../creeps/DruidCreep2'
import XFighterCreep from '../creeps/XFighterCreep'

class CreepController {

    constructor(game){
        this.game = game;

        this.creeps = [];
        this.entities = [];

        this.creepPrefabs = [
            DruidCreep1,
            DruidCreep2,
            //XFighterCreep
        ];
    }

    SpawnCreep(settings){
        if(this.creeps.length >= 20) return;
        let x = Math.round(-80 + Math.random() * 200);
        let z = Math.round(-500 + Math.random() * 200);
        x = x % 2 == 0 ? x : x + 1;

        let prefabIndex = Math.round(Math.random() * (this.creepPrefabs.length - 1));
        
        let creep = new this.creepPrefabs[prefabIndex](this.game, {
            position: new Vector3(x, 0, z)
        });

        this.game.scene.add(creep.mesh);

        this.creeps.push(creep);
        this.entities.push(creep.entity);
    }

    RemoveCreep(creep){
        this.game.scene.remove(creep.mesh);
        this.creeps.splice(this.creeps.indexOf(creep), 1);
    }

    Update(){
        for(let i = 0; i < this.creeps.length; i++){
            this.creeps[i].update();
        }
    }

    UpdatePathes(){
        for(let i = 0; i < this.creeps.length; i++){
            setTimeout(() => { 
                if(typeof this.creeps[i] === 'undefined') return;
                this.creeps[i].UpdatePath(); 
            }, i);
        }
    }

}

export default CreepController;