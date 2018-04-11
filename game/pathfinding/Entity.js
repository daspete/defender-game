import { 
    Vector3,
    Group,
    Box3,
    Raycaster
} from 'three'


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
Math.getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
Math.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Vector3.prototype.perp = function () {
    return new Vector3(-this.z, 0, this.x)
}

Vector3.prototype.sign = function (vector) {
    return this.perp().dot(vector) < 0 ? -1 : 1
}

Object.defineProperty(Vector3.prototype, 'angle', {
    enumerable: true,
    configurable: true,
    get: function () {
        return Math.atan2(this.z, this.x)
    },

    set: function (value) {
        this.x = Math.cos(value) * this.length()
        this.z = Math.sin(value) * this.length()
    }

});

class Entity extends Group {

    constructor(mesh){
        super(mesh);

        this.mesh = mesh;
        this.mass = 1;
        this.maxSpeed = 10;

        this.position.copy(mesh.position);
        this.velocity = new Vector3(0,0,0);

        this.box = new Box3().setFromObject(mesh);
        this.raycaster = new Raycaster();

        this.velocitySamples = [];
        this.numSamplesForSmoothing = 20;

        this.add(this.mesh);

        this.radius = 200;
    }

    get width(){
        return this.box.max.x - this.box.min.x;
    }

    get height(){
        return this.box.max.y - this.box.min.y;
    }

    get depth(){
        return this.box.max.z - this.box.min.z;
    }

    get forward(){
        return new Vector3(0,0,-1).applyQuaternion(this.quaternion).negate()
    }

    get backward(){
        return this.forward.clone().negate();
    }

    get left(){
        return this.forward.clone().applyAxisAngle(new Vector3(0, 1, 0), Math.PI * .5);
    }

    get right(){
        return this.left.clone().negate();
    }

    update(){
        this.velocity.clampLength(0, this.maxSpeed)
        this.velocity.setY(0);
        this.position.add(this.velocity)
    }

    bounce(box){
        if(this.position.x > box.max.x){
            this.position.setX(box.max.x);
            this.velocity.angle = this.velocity.angle + .1;
        }

        if(this.position.x < box.min.x){
            this.position.setX(box.min.x);
            this.velocity.angle = this.velocity.angle + .1;
        }

        if(this.position.z > box.max.z){
            this.position.setZ(box.max.z);
            this.velocity.angle = this.velocity.angle + .1;
        }

        if(this.position.z < box.min.z){
            this.position.setZ(box.min.z);
            this.velocity.angle = this.velocity.angle + .1;
        }

        if(this.position.y > box.max.y){
            this.position.setY(box.max.y);
        }

        if(this.position.y < box.min.y){
            this.position.setY(-box.min.y);
        }
    }

    wrap(box){
        if(this.position.x > box.max.x){
            this.position.setX(box.min.x + 1);
        }

        else if(this.position.x < box.min.x){
            this.position.setX(box.max.x - 1);
        }

        if(this.position.z > box.max.z){
            this.position.setZ(box.min.z + 1);
        }else if(this.position.z < box.min.z){
            this.position.setZ(box.max.z - 1);
        }

        if(this.position.y > box.max.y){
            this.position.setY(box.min.y + 1);
        }else if(this.position.y < box.min.y){
            this.position.setY(box.max.y + 1);
        }
    }

    lookWhereGoing(smoothing){
        var direction = this.position.clone().add(this.velocity).setY(this.position.y)

        if(smoothing){
            if(this.velocitySamples.length == this.numSamplesForSmoothing){
                this.velocitySamples.shift();
            }

            this.velocitySamples.push(this.velocity.clone().setY(this.position.y));

            direction.set(0, 0, 0);
            
            for (var v = 0; v < this.velocitySamples.length; v++){
                direction.add(this.velocitySamples[v])
            }

            direction.divideScalar(this.velocitySamples.length)
            direction = this.position.clone().add(direction).setY(this.position.y)
        }

        this.lookAt(direction);
        this.mesh.lookAt(direction);

    }
    

}

export default Entity;