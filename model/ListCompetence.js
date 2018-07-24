export class ListCompetence{
    constructor(){
        this._competences = [];
        this._comment = false;
    }

    setComment(bool){
        this._comment = bool;
    }

    setCompetenceQuestion(question){
        this.competences.map((e) => {
            e.setQuestions(question);
        });
    }

    addQuestion(index_c,element){
        this.competences[index_c].QuestionsController.add(element,index_c);
    }

    get comment(){
        return this._comment;
    }

    add(competence,index){
        this._competences.push(competence);
        this._competences[this._competences.length-1].setIndex(index);
    }

    get competences(){
        return this._competences;
    }

    reload(){

    }

    remove(index){
        this._competences = this._competences
            .filter(element => element.index != index);

        this._competences.map((element,index) => element.setIndex(index+1));
    }
}
