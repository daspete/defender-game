import {
    Vector3
} from 'three'

class TowerStats {

    constructor(game, tower){
        this.game = game;
        this.tower = tower;

        this.enery = 100;
        this.damage = 2;
        this.shootRate = 1200;
        this.shootRange = 30;

        this.lastShot = 0;
    }

    Update(){

        let currentTime = Date.now();

        if(currentTime - this.lastShot > this.shootRate){
            this.Shoot();
            this.lastShot = currentTime;
        }
    }

    Shoot(){
        this.enemy = this.GetNearestEnemy();

        if(this.enemy == null) return;

        this.enemy.stats.TakeDamage(this.damage);
    }

    GetNearestEnemy(){
        let minDistance = 1000000;
        let nearestNeighbor = null;

        for(let i = 0; i < this.game.controllers.creep.creeps.length; i++){
            let enemy = this.game.controllers.creep.creeps[i];

            let towerPosition = this.tower.settings.position.clone();
            let enemyPosition = enemy.entity.position;

            let distance = towerPosition.distanceTo(enemyPosition);

            if(distance > this.shootRange) continue;

            if(distance < minDistance){
                minDistance = distance;

                nearestNeighbor = this.game.controllers.creep.creeps[i];
            }

        }

        return nearestNeighbor;
    }

}

export default TowerStats;