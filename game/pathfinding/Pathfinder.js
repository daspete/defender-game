import PF from 'pathfinding'

import {
    Vector3
} from 'three'

class Pathfinder {

    constructor(game){
        this.game = game;
        this.grid = new PF.Grid(100, 500);

        this.sizeX = 100;
        this.sizeZ = 500;
        this.scale = 0.25;

        this.finder = new PF.AStarFinder({
            allowDiagonal: true,
            dontCrossCorners: true
        });
    }

    AddObstacle(position){
        position = this.GetGridPosition(position);

        this.grid.setWalkableAt(position.x, position.z, false);

        this.game.controllers.creep.UpdatePathes();
    }

    GetGridPosition(position){
        let positionX = Math.floor((position.x + this.sizeX) * this.scale);
        let positionZ = Math.floor((position.z + this.sizeZ) * this.scale);

        return {
            x: positionX,
            z: positionZ
        };
    }

    SetGridPosition(position){
        return new Vector3(
            (parseFloat(position[0]) / this.scale) - this.sizeX + 0.5,
            0,
            (parseFloat(position[1]) / this.scale) - this.sizeZ + 0.5
        )
    }

    RemoveObstacle(position){
        position = this.GetGridPosition(position);

        this.grid.setWalkableAt(position.x, position.z, true);

        this.game.controllers.creep.UpdatePathes();
    }

    FindPath(start, end){
        try {
            start = this.GetGridPosition(start);
            end = this.GetGridPosition(end);
        }catch(e){
            console.log(e);
        }  
            if(start.x < 0 || start.z < 0 || start.x > this.sizeX - 1 || start.z > this.sizeZ - 1) return false;
            if(end.x < 0 || end.z < 0 || end.x > this.sizeX - 1 || end.z > this.sizeZ - 1) return false;

            let grid = this.grid.clone();

            let gridPath = this.finder.findPath(start.x, start.z, end.x, end.z, grid);

            let path = [];

            for(let i = 0; i < gridPath.length; i++){
                path.push(this.SetGridPosition(gridPath[i]));
            }

            return path;
        
        
    }

}

export default Pathfinder;