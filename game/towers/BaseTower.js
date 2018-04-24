import {
    Vector3,
    Object3D,
    ObjectLoader
} from 'three'

class BaseTower {

    constructor(game, settings){
        this.game = game;
        this.settings = settings;
        this.ready = false;    
        this.mesh = this.game.objectLoader.objects.basetower.data.clone();

        this.initMesh();

        let scale = 0.025;
        this.mesh.scale.set(scale, scale, scale);
        this.mesh.position.set(settings.position.x, 0, settings.position.z);
    }

    initMesh(){
        this.mesh.traverse((obj) => {
            if(obj.type == 'Mesh'){
                obj.material.shininess = 0;
            }
            

            if(obj.name == 'RotationPoint' ||
                obj.name == 'Stand' ||
                obj.name == 'Sockel'){

                obj.castShadow = true;
            }
        });
    }


    update(){
        
    }

}

export default BaseTower;