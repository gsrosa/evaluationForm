import {ProxyFactory} from "../services/ProxyFactory.js";

export class Bind{
    constructor(model,view,events, ...props){
        let proxy = ProxyFactory.create(model,props, model => {
            view.update(model);
            events(model);
        });

        return proxy;
    }
}
