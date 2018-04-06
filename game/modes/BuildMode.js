import {
    Raycaster,
    Vector3
} from 'three'

import MeshGenerator from '../generators/MeshGenerator'


class BuildMode {

    constructor(game){
        this.game = game;

        this.ghost = null;
        this.raycaster = new Raycaster();

        this.ghost = MeshGenerator.Cube({
            width: 1.1,
            height: 1.1,
            depth: 1.1,
            material: {
                color: 0x00ff00,
                opacity: 0.5,
                transparent: true
            }
        });
    }

    Enable(){
        this.game.scene.add(this.ghost);
    }

    Disable(){
        this.game.scene.remove(this.ghost);
    }

    OnMove(position){
        this.ghost.position.copy(position);
        
        if(this.IsTowerOnPosition(position) == true){
            this.SetDestroyMode();
            return;
        }

        this.SetBuildMode();

        
    }

    SetBuildMode(){
        if(this.ghost == null) return;

        this.ghost.material.color.setHex(0x00ff00);
    }

    SetDestroyMode(){
        if(this.ghost == null) return;

        this.ghost.material.color.setHex(0xff0000);
    }

    OnTouch(position){
        if(this.GetTowerOnPosition(position) != false) return false;
        
        this.game.controllers.tower.BuildTower({
            position
        });

        this.SetDestroyMode();
    }

    OnTouchRight(position){
        let tower = this.GetTowerOnPosition(position);


        if(tower != false){
            this.game.controllers.tower.DestroyTower(tower);
        }

        this.SetBuildMode();
        
    }

    GetTowerOnPosition(position){
        let _position = new Vector3();
        _position.copy(position);
        _position.y = 5;

        this.raycaster.set(_position, new Vector3(0, -1, 0));

        let intersects = this.raycaster.intersectObjects(this.game.controllers.tower.towers);

        if(intersects.length > 0){
            return intersects[0].object;
        }

        return false;
    }

    IsTowerOnPosition(position){
        if(this.GetTowerOnPosition(position) == false) return false;

        return true;
    }

}

export default BuildMode;