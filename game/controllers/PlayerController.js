import MeshGenerator from '../generators/MeshGenerator'

import BuildMode from '../modes/BuildMode'

class PlayerController {

    constructor(game){
        this.game = game;

        this.modes = {
            build: new BuildMode(this.game)
        };

        this.mode = this.modes.build;

        this.mode.Enable();

        this.game.events.on('ground.hit.move', (position) => { this.OnGroundHitMove(position) });
        this.game.events.on('ground.hit.touch', (position) => { this.OnGroundHitTouch(position) });
        this.game.events.on('ground.hit.touchright', (position) => { this.OnGroundHitTouchRight(position) });
    }

    Update(){

    }

    OnGroundHitMove(position){
        this.mode.OnMove(position);
    }

    OnGroundHitTouch(position){
        this.mode.OnTouch(position);
    }

    OnGroundHitTouchRight(position){
        this.mode.OnTouchRight(position);
    }

}

export default PlayerController;