export class Questions {
    constructor(title,options,index) {
        this._title = title;
        this._options = options;
        this._index = index;
        this._visible = true;
    }

    setTitle(title){
        this._title = title;
    }

    setOptions(options){
        this._options = options;
    }

    setVisible(bool){
        this._visible = bool;
    }

    get title(){
        return this._title;
    }

    get options(){
        return this._options;
    }

    get index(){
        return this._index;
    }

    get visible(){
        return this._visible;
    }
}
