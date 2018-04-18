import PF from 'pathfinding'

import {
    Vector3
} from 'three'

class Pathfinder {

    constructor(game){
        this.game = game;
        this.grid = new PF.Grid(50, 250);

        this.sizeX = 100;
        this.sizeZ = 500;
        this.scale = 0.25;
    }

    AddObstacle(position){
        let positionX = Math.round((position.x + this.sizeX) * this.scale) - 1;
        let positionZ = Math.round((position.z + this.sizeZ) * this.scale) - 1;

        this.grid.setWalkableAt(positionX, positionZ, false);

        this.game.controllers.creep.UpdatePathes();
    }

    RemoveObstacle(position){
        let positionX = Math.round((position.x + this.sizeX) * this.scale) - 1;
        let positionZ = Math.round((position.z + this.sizeZ) * this.scale) - 1;

        this.grid.setWalkableAt(positionX, positionZ, true);

        this.game.controllers.creep.UpdatePathes();
    }

    FindPath(start, end){
        let startX = Math.round((start.x + this.sizeX) * this.scale) - 1;
        let startZ = Math.round((start.z + this.sizeZ) * this.scale) - 1;

        let endX = Math.round((end.x + this.sizeX) * this.scale) - 1;
        let endZ = Math.round((end.z + this.sizeZ) * this.scale) - 1;

        if(startX < 0 || startZ < 0 || startX > this.sizeX - 1 || startZ > this.sizeZ - 1) return false;
        if(endX < 0 || endZ < 0 || endX > this.sizeX - 1 || endZ > this.sizeZ - 1) return false;
        
        startX = Math.abs(startX);
        startZ = Math.abs(startZ);

        endX = Math.abs(endX);
        endZ = Math.abs(endZ);

        let grid = this.grid.clone();

        let finder = new PF.AStarFinder({
            allowDiagonal: true,
            dontCrossCorners: true
        });

        let gridPath = finder.findPath(startX, startZ, endX, endZ, grid);

        let path = [];

        for(let i = 0; i < gridPath.length; i++){
            path.push(new Vector3(
                (parseFloat(gridPath[i][0]) / this.scale) - this.sizeX + 0.5,
                0,
                (parseFloat(gridPath[i][1]) / this.scale) - this.sizeZ + 0.5
            ));
        }

        return path;
    }

}

export default Pathfinder;