import {
    Object3D,
    ObjectLoader
} from 'three'

import TweenMax from 'gsap'

import MeshGenerator from '../generators/MeshGenerator'

class CreepController {

    constructor(game){
        this.game = game;

        this.creeps = [];
    }

    SpawnCreep(settings){
        let creep = MeshGenerator.Cube({
            width: 1,
            height: 2,
            depth: 1,
            material: {
                color: 0xff0000,
            }
        });

        let x = Math.round(-100 + Math.random() * 200);
        x = x % 2 == 0 ? x : x + 1;

        creep.position.set(x, 0, -100);

        this.game.scene.add(creep);
        
        TweenMax.to(creep.position, 10, {
            x: x,
            y: 0,
            z: 50,
            ease: Linear.easeNone
        });

        this.creeps.push(creep);
    }

}

export default CreepController;