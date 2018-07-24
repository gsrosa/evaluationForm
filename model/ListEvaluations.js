import {Alerts} from "../helpers/Alerts.js";

export class ListEvaluations{
    constructor(){
        this._evaluations = [];
    }

    add(evaluation,elRef){
        this._evaluations.push(evaluation);
        this._evaluations.map((e) => {
            e.CompetenceController.setIndex(e.index);
        });

        this._elementReference = elRef;
        console.log(this.evaluations);
    }

    get evaluations(){
        return this._evaluations;
    }

    ElementReference(index){
        Alerts.remove(() =>
            this._elementReference
            .remove(index));
    }

    remove(index){
        this._evaluations = this.evaluations
            .filter(element => element.index != index);

        this._evaluations.map((element,index) => element.setIndex(index+1));
        console.log(this.evaluations);
    }


    addCompetence(index,content){
        this._evaluations[(index-1)].CompetenceController.add(content,index);
        this._evaluations[(index-1)]
            .setCompetences(this._evaluations[(index-1)].CompetenceController.list);
    }

    get _ListCompetence(){
        return  this._CompetenceController.list;
    }
}
