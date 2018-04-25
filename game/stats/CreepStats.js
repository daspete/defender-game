class CreepStats {

    constructor(game, creep){
        this.game = game;
        this.creep = creep;
        this.energy = 100;
        this.damage = 0;
        this.shootRate = 0;

        this.isDead = false;
    }

    TakeDamage(damage){
        
        if(this.isDead) return;

        this.energy = Math.max(0, this.energy - damage);

        if(this.energy > 0) return;

        this.Die();
    }

    Die(){
        this.isDead = true;

        this.game.controllers.creep.RemoveCreep(this.creep);
    }

    GoalArrived(){
        this.isDead = true;

        this.game.controllers.creep.RemoveCreep(this.creep);
    }

}

export default CreepStats;