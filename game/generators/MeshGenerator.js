import {
    BoxGeometry,
    PlaneBufferGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three'

class MeshGenerator {
    
    static Cube(settings){
        let geometry = new BoxGeometry(settings.width, settings.height, settings.depth);
        let material = new MeshBasicMaterial(settings.material);

        return new Mesh(geometry, material);
    }

    static Plane(settings){
        let geometry = new PlaneBufferGeometry(settings.width, settings.height);
        geometry.rotateX(-Math.PI * 0.5);
        let material = new MeshBasicMaterial(settings.material);

        return new Mesh(geometry, material);
    }

}

export default MeshGenerator