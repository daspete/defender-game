import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Vector3,
    GridHelper
} from 'three'

import MeshGenerator from './generators/MeshGenerator'

import EventController from './controllers/EventController'
import PlayerController from './controllers/PlayerController'
import TowerController from './controllers/TowerController'

import MouseInput from './inputs/MouseInput'

import GroundCaster from './casters/GroundCaster'


class GameController {

    constructor(settings){
        this.settings = settings;

        this.events = new EventController();
        this.scene = new Scene();

        this.camera = new PerspectiveCamera(75, this.settings.width / this.settings.height, 0.1, 1000);

        this.camera.position.set(0, 50, 50);
        this.camera.lookAt(new Vector3(0, 0, 0));

        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.settings.width, this.settings.height);

        this.settings.container.innerHtml = '';
        this.settings.container.appendChild(this.renderer.domElement);

        this.inputs = {
            mouse: new MouseInput(this)
        };

        this.casters = {
            ground: new GroundCaster(this)
        };

        this.controllers = {
            player: new PlayerController(this),
            tower: new TowerController(this)
        };


        this.CreateGrid();


        this.Update();
    }

    CreateGrid(){
        this.grid = new GridHelper(1000, 50, 0xff9900, 0xff9900);

        this.scene.add(this.grid);
    }


    Update(){
        requestAnimationFrame(() => { this.Update() });

        this.controllers.player.Update();

        this.renderer.render(this.scene, this.camera);
    }

}

export default GameController