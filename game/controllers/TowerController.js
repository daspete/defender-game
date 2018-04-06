import {
    Object3D,
    ObjectLoader
} from 'three'

import MeshGenerator from '../generators/MeshGenerator'

import BuildMode from '../modes/BuildMode'

import Tower1 from '~/assets/models/towers/Tower1.json'

class TowerController {

    constructor(game){
        this.game = game;
        this.loader = new ObjectLoader();

        this.towers = [];
    }

    BuildTower(settings){
        let tower = MeshGenerator.Cube({
            width: 1,
            height: 2,
            depth: 1,
            material: {
                opacity: 0,
                transparent: true
            }
        });

        let towerGraphic = this.loader.parse(Tower1);
        tower.add(towerGraphic);

        this.game.scene.add(tower);
        
        tower.position.copy(settings.position);

        this.towers.push(tower);
    }

    DestroyTower(tower){
        let _tower = this.towers.find((item) => {
            return item.uuid == tower.uuid;
        });

        _tower.visible = false;
        
        this.game.scene.remove(_tower);
        
        this.towers.splice(this.towers.indexOf(tower), 1);

        console.log(this.towers);
    }

}

export default TowerController;