import {
    Vector3,
    Object3D,
    ObjectLoader
} from 'three'

import MeshGenerator from '../generators/MeshGenerator'

import BuildMode from '../modes/BuildMode'

import BaseTower from '../towers/BaseTower'


class TowerController {

    constructor(game){
        this.game = game;

        this.towerPrefabs = [
            BaseTower
        ];

        this.towers = [];
    }

    BuildTower(settings){
        let tower = MeshGenerator.Cube({
            width: 2,
            height: 4,
            depth: 2,
            material: {
                // opacity: 0,
                // transparent: true,
                color:0xff0000
            }
        });

        let _tower = new this.towerPrefabs[0](this.game, {
            position: new Vector3(0,0,0)
        });

        // tower.add(_tower.mesh);

        this.game.scene.add(tower);
        
        tower.position.copy(settings.position);
        tower._tower = _tower;
        _tower.settings.position.copy(settings.position);

        this.towers.push(tower);

        this.game.pathfinder.AddObstacle(settings.position);
    }

    DestroyTower(tower){
        let _tower = this.towers.find((item) => {
            return item.uuid == tower.uuid;
        });

        _tower.visible = false;

        this.game.pathfinder.RemoveObstacle(_tower.position);
        
        this.game.scene.remove(_tower);
        
        this.towers.splice(this.towers.indexOf(tower), 1);
    }

    Update(){
        for(let i = 0; i < this.towers.length; i++){
            this.towers[i]._tower.update();
        }
    }

}

export default TowerController;