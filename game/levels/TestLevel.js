import FBXLoader from '../loaders/FBXLoader'

import MeshGenerator from '../generators/MeshGenerator'

class TestLevel {

    constructor(game){
        this.game = game;

        this.environment = null;
    }

    start(){
        this.environment = this.game.objectLoader.objects.testlevel.data;
        this.environment.traverse((obj) => {
            if(obj.name == 'NavMesh'){
                obj.visible = false;
            }else{
                if(obj.type == 'Mesh'){
                    obj.material.shininess = 0;
                    obj.receiveShadow = true;
                    obj.castShadow = true;
                }
            }
        });
    }

}

export default TestLevel;