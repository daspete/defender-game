import {
    Vector2
} from 'three'

class MouseInput {

    constructor(game){
        this.game = game;

        document.removeEventListener('mousemove', (e) => { this.OnMouseMove(e) }, false);
        //document.removeEventListener('mousedown', (e) => { this.OnMouseDown(e) }, false);

        document.addEventListener('mousemove', (e) => { this.OnMouseMove(e) }, false);
        //document.addEventListener('mousedown', (e) => { this.OnMouseDown(e) }, false);
    }

    OnMouseMove(e){
        e.preventDefault();

        this.game.events.emit('mousemove', new Vector2().set(
            (e.clientX / this.game.settings.width) * 2 - 1,
            -(e.clientY / this.game.settings.height) * 2 + 1
        ));
    }

}

export default MouseInput