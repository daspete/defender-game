import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Vector3
} from 'three'

import Player from './objects/Player'

class GameController {

    constructor(settings){
        this.settings = settings;

        this.scene = new Scene();

        this.camera = new PerspectiveCamera(
            75, 
            this.settings.width / this.settings.height, 
            0.1, 
            1000
        );

        this.camera.position.set(0,0,5);
        this.camera.lookAt(new Vector3(0,0,0));

        this.renderer = new WebGLRenderer();

        this.renderer.setSize(this.settings.width, this.settings.height);

        this.settings.container.innerHtml = '';
        this.settings.container.appendChild(this.renderer.domElement);

        this.CreatePlayer();

        this.Update();
    }

    CreatePlayer(){
        this.player = new Player(this);
    }

    Update(){
        requestAnimationFrame(() => { this.Update() });

        this.player.Update();

        this.renderer.render(this.scene, this.camera);
    }

}

export default GameController