import {
    Vector3
} from 'three'

import Entity from './Entity'

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

class SteeringEntity extends Entity {

    constructor(mesh){
        super(mesh);

        this.maxForce = 5;
        this.arrivalThreshold = 400;

        this.wanderAngle = 0;
        this.wanderDistance = 10;
        this.wanderRadius = 5;
        this.wanderRange = 1;

        this.avoidDistance = 400;

        this.inSightDistance = 200;
        this.tooCloseDistance = 60;

        this.pathIndex = 0;

        this.steeringForce = new Vector3(0,0,0);
    }

    seek(position){
        var desiredVelocity = position.clone().sub(this.position);
        desiredVelocity.normalize().setLength(this.maxSpeed).sub(this.velocity);
        this.steeringForce.add(desiredVelocity);
    }

    flee(position){
        var desiredVelocity = position.clone().sub(this.position);
        desiredVelocity.normalize().setLength(this.maxSpeed).sub(this.velocity);
        this.steeringForce.sub(desiredVelocity);
    }

    arrive(position){
        var desiredVelocity = position.clone().sub(this.position);
        desiredVelocity.normalize()
        
        var distance = this.position.distanceTo(position)
        
        if(distance > this.arrivalThreshold)
            desiredVelocity.setLength(this.maxSpeed);
        else
            desiredVelocity.setLength(this.maxSpeed * distance / this.arrivalThreshold)
        
        desiredVelocity.sub(this.velocity);
    
        this.steeringForce.add(desiredVelocity);
    }

    pursue(target){
        var lookAheadTime = this.position.distanceTo(target.position) / this.maxSpeed;
        var predictedTarget = target.position.clone().add(target.velocity.clone().setLength(lookAheadTime));
        
        this.seek(predictedTarget);
    }

    evade(target){
        var lookAheadTime = this.position.distanceTo(target.position) / this.maxSpeed;
        var predictedTarget = target.position.clone().sub(target.velocity.clone().setLength(lookAheadTime));
        
        this.flee(predictedTarget);
    }

    idle(){
        this.velocity.setLength(0);
        this.steeringForce.set(0,0,0);
    }

    wander(){
        var offset = new Vector3(1, 1, 1);
        offset.setLength(this.wanderRadius);
        offset.x = Math.sin(this.wanderAngle) * offset.length()
        offset.z = Math.cos(this.wanderAngle) * offset.length()
        offset.y = Math.sin(this.wanderAngle) * offset.length()

        var center = this.velocity.clone().normalize().setLength(this.wanderDistance);
        center.add(offset);
        center.setY(0);
        
        this.wanderAngle += Math.random() * this.wanderRange - this.wanderRange * .5;
        
        this.steeringForce.add(center);
    }

    interpose(targetA, targetB){
        var midPoint = targetA.position.clone().add(targetB.position.clone()).divideScalar(2);
        
        var timeToMidPoint = this.position.distanceTo(midPoint) / this.maxSpeed;
        
        var pointA = targetA.position.clone().add(targetA.velocity.clone().multiplyScalar(timeToMidPoint))
        var pointB = targetB.position.clone().add(targetB.velocity.clone().multiplyScalar(timeToMidPoint))
        
        midPoint = pointA.add(pointB).divideScalar(2);
        
        this.seek(midPoint)
    }

    separation(entities, separationRadius = 300, maxSeparation = 100){
        var force = new Vector3(0, 0, 0);
        var neighborCount = 0;

        for(var i = 0; i < entities.length; i++){
            if(entities[i] != this && entities[i].position.distanceTo(this.position) <= separationRadius){
                force.add(entities[i].position.clone().sub(this.position));
                neighborCount++;
            }
        }

        if(neighborCount != 0) {
            force.divideScalar(neighborCount);
            force.negate();
        }

        force.normalize();
        force.multiplyScalar(maxSeparation);

        this.steeringForce.add(force);
    }

    isOnLeaderSight(leader, ahead, leaderSightRadius){
        return ahead.distanceTo(this.position) <= leaderSightRadius || leader.position.distanceTo(this.position) <= leaderSightRadius;
    }

    followLeader(leader, entities, distance = 400, separationRadius = 300, maxSeparation = 100, leaderSightRadius = 1600, arrivalThreshold = 200){
        var tv = leader.velocity.clone();
        tv.normalize().multiplyScalar(distance);

        var ahead = leader.position.clone().add(tv)
        tv.negate();

        var behind = leader.position.clone().add(tv)

        if(this.isOnLeaderSight(leader, ahead, leaderSightRadius)){
            this.evade(leader);
        }

        this.arrivalThreshold = arrivalThreshold;
        
        this.arrive(behind);
        
        this.separation(entities, separationRadius, maxSeparation);
    }

    getNeighborAhead(entities){
        var maxQueueAhead = 500;
        var maxQueueRadius = 500;
        var res;
        var qa = this.velocity.clone().normalize().multiplyScalar(maxQueueAhead);
        var ahead = this.position.clone().add(qa);

        for(var i = 0; i < entities.length; i++){
            var distance = ahead.distanceTo(entities[i].position);
            
            if(entities[i] != this && distance <= maxQueueRadius){
                res = entities[i]
                break;
            }
        }

        return res;
    }

    queue(entities, maxQueueRadius = 500){
        var neighbor = this.getNeighborAhead(entities);
        var brake = new Vector3(0, 0, 0);
        var v = this.velocity.clone();

        if(neighbor != null){
            brake = this.steeringForce.clone().negate().multiplyScalar(0.8);
            v.negate().normalize();
            brake.add(v);

            if(this.position.distanceTo(neighbor.position) <= maxQueueRadius){
                this.velocity.multiplyScalar(0.3)
            }
        }

        this.steeringForce.add(brake);
    }

    inSight(entity){
        if(this.position.distanceTo(entity.position) > this.inSightDistance) return false;

        var heading = this.velocity.clone().normalize();
        var difference = entity.position.clone().sub(this.position);
        var dot = difference.dot(heading);

        if (dot < 0) return false;

        return true;
    }

    flock(entities){
        var averageVelocity = this.velocity.clone();
        var averagePosition = new THREE.Vector3(0, 0, 0);
        var inSightCount = 0;

        for(var i = 0; i < entities.length; i++){
            if(entities[i] != this && this.inSight(entities[i])){
                averageVelocity.add(entities[i].velocity);
                averagePosition.add(entities[i].position);

                if(this.position.distanceTo(entities[i].position) < this.tooCloseDistance){
                    this.flee(entities[i].position);
                }

                inSightCount++;
            }
        }

        if(inSightCount > 0){
            averageVelocity.divideScalar(inSightCount);
            averagePosition.divideScalar(inSightCount);

            this.seek(averagePosition);
            
            this.steeringForce.add(averageVelocity.sub(this.velocity));
        }
    }

    followPath(path, loop, thresholdRadius = 1){
        var wayPoint = path[this.pathIndex];

        if(wayPoint == null) return;

        if(this.position.distanceTo(wayPoint) < thresholdRadius){
            if(this.pathIndex >= path.length - 1){
                if(loop) this.pathIndex = 0;
            }else{
                this.pathIndex++;
            }
        }

        if(this.pathIndex >= path.length - 1 && !loop)
            this.arrive(wayPoint)
        else
            this.seek(wayPoint)
    }

    avoid(obstacles){
        var dynamic_length = this.velocity.length() / this.maxSpeed;

        var ahead = this.position.clone().add(this.velocity.clone().normalize().multiplyScalar(dynamic_length))
        var ahead2 = this.position.clone().add(this.velocity.clone().normalize().multiplyScalar(this.avoidDistance * .5));

        var mostThreatening = null;
        for(var i = 0; i < obstacles.length; i++){
            if (obstacles[i] === this) continue;

            var collision = obstacles[i].position.distanceTo(ahead) <= obstacles[i].radius || obstacles[i].position.distanceTo(ahead2) <= obstacles[i].radius
            if(collision && (mostThreatening == null || this.position.distanceTo(obstacles[i].position) < this.position.distanceTo(mostThreatening.position))){
                mostThreatening = obstacles[i];
            }
        }

        var avoidance = new Vector3(0, 0, 0);
        if(mostThreatening != null){
            avoidance = ahead.clone().sub(mostThreatening.position).normalize().multiplyScalar(100);
        }

        this.steeringForce.add(avoidance);
    }

    update(){
        this.steeringForce.clampLength(0, this.maxForce);
        this.steeringForce.divideScalar(this.mass);
        this.velocity.add(this.steeringForce);
        this.steeringForce.set(0, 0, 0);

        super.update();
    }

}

export default SteeringEntity;