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

import Pathfinder from './pathfinding/Pathfinder'

import TestLevel from './levels/TestLevel'

import ObjectLoader from './loaders/ObjectLoader'
import CameraController from './controllers/CameraController';


class GameController {

    constructor(settings){
        this.settings = settings;

        this.events = new EventController();
        this.scene = new Scene();

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

        this.objectLoader = new ObjectLoader({
            game: this,
            objects: [
                {
                    name: 'testlevel',
                    url: 'assets/models/levels/TestLevel/TestLevel.fbx'
                },
                {
                    name: 'druidcreep1',
                    url: 'assets/models/creeps/Druide1.fbx'
                },
                {
                    name: 'druidcreep2',
                    url: 'assets/models/creeps/Druide2.fbx'
                },
                {
                    name: 'xfighter',
                    url: 'assets/models/creeps/XFighter.fbx'
                },
                {
                    name: 'basetower',
                    url: 'assets/models/towers/BaseTower.fbx'
                }                
            ],
            callback: () => { this.OnObjectsLoaded(); }
        })

        this.inputs = {
            mouse: new MouseInput(this)
        };

        this.casters = {
            ground: new GroundCaster(this)
        };

        this.controllers = {
            player: new PlayerController(this),
            tower: new TowerController(this),
            creep: new CreepController(this),
            camera: new CameraController(this)
        };

        this.levels = {
            testLevel: new TestLevel(this)
        };
        this.level = this.levels.testLevel;

        this.pathfinder = new Pathfinder(this);
    }


    CreateLight(){
        this.lights = {
            ambient: new HemisphereLight(0xddeeff, 0x0f0e0d, 0.02),
            sun: new PointLight(0xffee88, 1, 1000, 1)
        };

        this.lights.sun.castShadow = true;
        this.lights.sun.position.set(0, 50, -200);
        this.lights.sun.power = 200;

        this.lights.ambient.intensity = 1.5;

        this.scene.add(this.lights.sun);
        this.scene.add(this.lights.ambient);

    }

    OnObjectsLoaded(){
        this.level.start();

        this.scene.add(this.level.environment);
        this.CreateLight();

        this.StartCreepSpawner();

        this.Update();
    }

    async StartCreepSpawner(){
        this.controllers.creep.SpawnCreep({});

        await this.Sleep(200);

        this.StartCreepSpawner();
    }


    Update(){
        requestAnimationFrame(() => { this.Update() });

        setTimeout(() => { this.controllers.player.Update(); }, 0);
        setTimeout(() => { this.controllers.creep.Update(); }, 1);
        setTimeout(() => { this.controllers.tower.Update(); }, 2);
        setTimeout(() => { this.controllers.camera.Update(); }, 3);

        this.renderer.render(this.scene, this.controllers.camera.camera);
    }

    Sleep(ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, ms);
        });
    }

}

export default GameController