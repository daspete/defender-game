import FBXLoader from '../loaders/FBXLoader'

class ObjectLoader {

    constructor(settings){
        this.settings = settings;

        this._objects = settings.objects;

        this.objects = {};

        this.loader = new FBXLoader();

        this.LoadObjects();
    }

    LoadObjects(){
        if(Object.keys(this.objects).length == this._objects.length){
            this.settings.callback();
            return;
        }

        let nextIndex = Object.keys(this.objects).length;

        let objectToLoad = this._objects[nextIndex];

        let object = {
            url: objectToLoad.url,
            name: objectToLoad.name
        };

        this.loader.onError = (a,b,c) => {
            console.log(a,b,c);
        };

        this.loader.load(objectToLoad.url, (_obj) => {
            object.data = _obj;

            this.objects[object.name] = object;

            this.LoadObjects();
        });
    }

    

}

export default ObjectLoader;