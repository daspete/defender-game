import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Vector3,
    GridHelper,
    PointLight,
    HemisphereLight,
    ReinhardToneMapping
} from 'three'

import MeshGenerator from './generators/MeshGenerator'

import EventController from './controllers/EventController'
import PlayerController from './controllers/PlayerController'
import TowerController from './controllers/TowerController'
import CreepController from './controllers/CreepController'

import MouseInput from './inputs/MouseInput'

import GroundCaster from './casters/GroundCaster'

import TestLevel from './levels/TestLevel'


class GameController {

    constructor(settings){
        this.settings = settings;

        this.events = new EventController();
        this.scene = new Scene();

        this.camera = new PerspectiveCamera(75, this.settings.width / this.settings.height, 0.1, 1000);

        this.camera.position.set(0, 40, 60);
        this.camera.lookAt(new Vector3(0, 0, 0));

        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.physicallyCorrectLights = true;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.toneMapping = ReinhardToneMapping;
        this.renderer.toneMappingExposure = 0.4;
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
            tower: new TowerController(this),
            creep: new CreepController(this)
        };

        this.levels = {
            testLevel: new TestLevel(this)
        };

        

        this.level = this.levels.testLevel;

        this.levels.testLevel.LoadLevel(() => { this.OnLevelLoaded() });

        //this.CreateGrid();

        
    }

    CreateGrid(){
        this.grid = new GridHelper(1000, 50, 0xff9900, 0xff9900);

        this.scene.add(this.grid);
    }

    CreateLight(){
        this.lights = {
            ambient: new HemisphereLight(0xddeeff, 0x0f0e0d, 0.02),
            sun: new PointLight(0xffee88, 1, 300, 1)
        };

        this.lights.sun.castShadow = true;
        this.lights.sun.position.set(0, 50, 0);
        this.lights.sun.power = 1600;

        this.lights.ambient.intensity = 2;

        this.scene.add(this.lights.sun);
        this.scene.add(this.lights.ambient);

    }

    OnLevelLoaded(){
        this.scene.add(this.level.environment);
        this.CreateLight();

        //this.StartCreepSpawner();

        this.Update();
    }

    async StartCreepSpawner(){
        this.controllers.creep.SpawnCreep({});

        await this.Sleep(200);

        this.StartCreepSpawner();
    }


    Update(){
        requestAnimationFrame(() => { this.Update() });

        this.controllers.player.Update();

        this.renderer.render(this.scene, this.camera);
    }

    Sleep(ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, ms);
        });
    }

}

export default GameController