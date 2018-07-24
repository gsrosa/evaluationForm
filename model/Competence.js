export class Competence {
    constructor(name,description,index,options,controller) {
        this._name = name;
        this._description = description;
        this._index = index;
        this._behaviors = false;
        this._questions = options;
        this._comment = false;

        this._visible = true;

        this._QuestionsController = controller;

        this._answers = this._QuestionsController.ListQuestions.questions;
        this._QuestionsController.setOptions(this._questions);
    }

    setName(name){
        this._name = name;
    }
    setDescription(description){
        this._description = description;
    }
    setBehaviors(bool){
        this._behaviors = bool;
    }
    setQuestions(questions){
        this._questions = questions;
        this._QuestionsController.setOptions(this._questions);
    }
    setIndex(i){
        this._index = i;
    }

    setVisible(bool){
        this._visible = bool;
    }

    get answers(){
        return this._answers;
    }

    get name(){
        return this._name;
    }
    get description(){
        return this._description;
    }
    get behaviors(){
        return this._behaviors;
    }
    get questions(){
        return this._questions;
    }
    get index(){
        return this._index;
    }
    get visible(){
        return this._visible;
    }

    get QuestionsController(){
        return this._QuestionsController;
    }
}
