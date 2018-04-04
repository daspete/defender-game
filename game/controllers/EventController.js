class EventController {

    constructor(){
        this.listeners = new Map();
    }

    on(label, callback){
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }

    off(label, callback){
        let listeners = this.listeners.get(label);

        if(listeners && listeners.length){
            this.listeners.set(label, listeners.filter((_callback) => {
                return !(typeof _callback == 'function' && _callback === callback);
            }));

            return true;
        }

        return false;
    }

    emit(label, ...args){
        let listeners = this.listeners.get(label);

        if(listeners && listeners.length){
            listeners.forEach((listener) => {
                listener(...args);
            });

            return true;
        }

        return false;
    }

    isFunction(obj){
        return typeof obj === 'function' || false;
    }

}

export default EventController