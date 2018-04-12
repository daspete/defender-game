import {
    Vector2
} from 'three'

class MouseInput {

    constructor(game){
        this.game = game;

        document.oncontextmenu = function(e){
            e.preventDefault();
        };

        this.game.settings.container.removeEventListener('mousemove', (e) => { this.OnMouseMove(e) }, false);
        this.game.settings.container.addEventListener('mousemove', (e) => { this.OnMouseMove(e) }, false);
        
        this.game.settings.container.removeEventListener('mousedown', (e) => { this.OnMouseDown(e) }, false);
        this.game.settings.container.addEventListener('mousedown', (e) => { this.OnMouseDown(e) }, false);

        this.game.settings.container.removeEventListener('wheel', (e) => { this.OnMouseWheel(e) }, false);
        this.game.settings.container.addEventListener('wheel', (e) => { this.OnMouseWheel(e) }, false);
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

        let position = new Vector2().set(
            (e.clientX / this.game.settings.width) * 2 - 1,
            -(e.clientY / this.game.settings.height) * 2 + 1
        );

        this.game.events.emit('mousedown', {
            position,
            button: e.which
        });
    }

    OnMouseWheel(e){
        this.game.events.emit('mousewheel', {
            y: e.deltaY
        });
    }

}

export default MouseInput