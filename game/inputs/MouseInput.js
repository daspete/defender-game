import {
    Vector2
} from 'three'

class MouseInput {

    constructor(game){
        this.game = game;

        this.game.settings.container.removeEventListener('mousemove', (e) => { this.OnMouseMove(e) }, false);
        this.game.settings.container.removeEventListener('mousedown', (e) => { this.OnMouseDown(e) }, false);

        this.game.settings.container.addEventListener('mousemove', (e) => { this.OnMouseMove(e) }, false);
        this.game.settings.container.addEventListener('mousedown', (e) => { this.OnMouseDown(e) }, false);
    }

    OnMouseMove(e){
        e.preventDefault();

        this.game.events.emit('mousemove', new Vector2().set(
            (e.clientX / this.game.settings.width) * 2 - 1,
            -(e.clientY / this.game.settings.height) * 2 + 1
        ));
    }

    OnMouseDown(e){
        e.preventDefault();

        console.log(e.clientX, e.clientY);

        this.game.events.emit('mousedown', new Vector2().set(
            (e.clientX / this.game.settings.width) * 2 - 1,
            -(e.clientY / this.game.settings.height) * 2 + 1
        ));
    }

}

export default MouseInput