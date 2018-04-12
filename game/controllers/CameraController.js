import {
    Vector3,
    PerspectiveCamera
} from 'three'

class CameraController {

    constructor(game){
        this.game = game;

        this.camera = new PerspectiveCamera(75, this.game.settings.width / this.game.settings.height, 0.1, 1000);

        this.camera.position.set(0, 40, -110);
        

        this.lookPosition = new Vector3(0, 0, -150);

        this.xRange = 30;
        this.zRange = 400;
        this.yMin = 20;
        this.yMax = 90;
        
        

        this.moveX = false;
        this.moveZ = false;

        this.cameraHeight = 50;

        this.game.events.on('mousemove', (position) => { this.OnMouseMove(position) });
        this.game.events.on('mousewheel', (data) => { this.OnMouseWheel(data) });
    }

    OnMouseWheel(data){
        let delta = data.y * 0.01;
        let scrollSpeed = 0.5 * delta;

        let height = this.cameraHeight;

        height += scrollSpeed;

        if(height > this.yMax){
            height = this.yMax;
        }

        if(height < this.yMin){
            height = this.yMin;
        }

        this.cameraHeight = height;
    }

    OnMouseMove(position){
        let xSector = 0.9;
        let zSector = 0.7;

        let xSpeed = 0.7;
        let zSpeed = 0.7;

        if(position.x < -xSector){
            this.moveX = -xSpeed;
        }

        if(position.x > xSector){
            this.moveX = xSpeed;
        }

        if(position.x >= -xSector && position.x <= xSector){
            this.moveX = false;
        }

        if(position.y < -zSector){
            this.moveZ = zSpeed;
        }

        if(position.y > zSector){
            this.moveZ = -zSpeed;
        }

        if(position.y >= -zSector && position.y <= zSector){
            this.moveZ = false;
        }
    }

    Update(){
        let cameraPosition = this.Move();

        cameraPosition.y = this.cameraHeight;

        this.lookPosition.copy(cameraPosition);
        this.lookPosition.y = 0;
        this.lookPosition.z -= 50;

        this.camera.position.copy(cameraPosition);
        this.camera.lookAt(this.lookPosition);
    }

    Move(){
        let cameraPosition = this.camera.position.clone();

        if(this.moveX == false && this.moveZ == false) return cameraPosition;

        if(this.moveX !== false){
            cameraPosition.x += this.moveX;
        }

        if(this.moveZ !== false){
            cameraPosition.z += this.moveZ;
        }

        if(cameraPosition.x < -this.xRange){
            cameraPosition.x = -this.xRange;
        }

        if(cameraPosition.x > this.xRange){
            cameraPosition.x = this.xRange;
        }

        if(cameraPosition.z < -this.zRange){
            cameraPosition.z = -this.zRange;
        }

        if(cameraPosition.z > this.zRange){
            cameraPosition.z = this.zRange;
        }

        return cameraPosition;
    }

}

export default CameraController;