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

        this.game.events.emit('mousemove', this.GetMousePosition(e));
    }

    OnMouseDown(e){
        e.preventDefault();

        let position = this.GetMousePosition(e);

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

    GetMousePosition(e){
        let positionX = e.clientX;
        let positionY = e.clientY;

        return new Vector2(
            (positionX / this.game.settings.width) * 2 - 1,
            -(positionY / this.game.settings.height) * 2 + 1
        );
    }

}

export default MouseInput