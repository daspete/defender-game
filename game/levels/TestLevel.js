import FBXLoader from '../loaders/FBXLoader'

import MeshGenerator from '../generators/MeshGenerator'

class TestLevel {

    constructor(game){
        this.game = game;

        this.environment = null;
        this.navmesh = null;
        this.loader = new FBXLoader();
    }

    LoadLevel(callback){
        this.loader.load('assets/models/levels/TestLevel/TestLevel.fbx', (_level) => {
            _level.traverse((obj) => {
                if(obj.name == 'NavMesh'){
                    obj.visible = false;

                    this.navmesh = obj;
                }else{
                    if(obj.type == 'Mesh'){
                        obj.material.shininess = 0;
                        obj.receiveShadow = true;
                        obj.castShadow = true;
                    }
                }
                
            });

            this.environment = _level;


            callback();
        });
    }

}

export default TestLevel;