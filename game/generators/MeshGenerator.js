import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three'

class MeshGenerator {
    
    static Cube(settings){
        let geometry = new BoxGeometry(settings.width, settings.height, settings.depth);
        let material = new MeshBasicMaterial(settings.material);

        return new Mesh(geometry, material);
    }

}

export default MeshGenerator