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

        let mesh = new Mesh(geometry, material);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    static Plane(settings){
        let geometry = new PlaneBufferGeometry(settings.width, settings.height);
        geometry.rotateX(-Math.PI * 0.5);
        let material = new MeshBasicMaterial(settings.material);

        return new Mesh(geometry, material);
    }

}

export default MeshGenerator