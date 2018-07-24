export class ListQuestions {
    constructor() {
        this._questions = [];
    }

    add(question){
        this._questions.push(question);
    }

    get questions(){
        return this._questions;
    }

    reload(){

    }
}
