export class Evaluation {
    constructor(name,index,controller) {
        this._name = name;
        this._index = index;
        this._type = 1;
        this._na = false;
        this._evaluterComment = false;
        this._required = false;
        this._competences = [];
        this._CompetenceController = controller;

        this._pattern = {
            1: ["Nunca","Raramente","Às vezes","Frequentemente","Sempre"],
            2: ["Insatisfatório","Necessário melhorar","Atende Expectativas","Excede expectativas","Excepcional"],
            3: ["Discordo fortemente","Discordo","Neutro","Concordo","Concordo fortemente"]
        };

        this._CompetenceController.setQuestions(this.pattern);
    }

    setName(name){
        this._name = name;
    }
    setNa(bool){
        this._na = bool;
        this._CompetenceController.setQuestions(this.pattern);
        this._CompetenceController.ListCompetence.setCompetenceQuestion(this.pattern);
    }
    setRequired(bool){
        this._required = bool;
    }
    setEvaluterComment(bool){
        this._evaluterComment = bool;
        this._CompetenceController.ListCompetence.setComment(bool);
    }
    setType(value){
        this._type = value;
        this._CompetenceController.setQuestions(this.pattern);
        this._CompetenceController.ListCompetence.setCompetenceQuestion(this.pattern);
    }
    setIndex(value){
        this._index = value;
    }
    setCompetences(list){
        this._competences = list;
    }

    get CompetenceController(){
        return this._CompetenceController;
    }

    get name(){
        return this._name;
    }
    get type(){
        return this._type;
    }
    get na(){
        return this._na;
    }
    get evaluterComment(){
        return this._evaluterComment;
    }
    get required(){
        return this._required;
    }
    get competences(){
        return this._competences;
    }

    get index(){
        return this._index;
    }

    get pattern(){
        if(this.na){
            if(this._pattern[this.type].indexOf("N/A") == -1)
                this._pattern[this.type].unshift("N/A");
        } else {
            if (this._pattern[this.type].indexOf("N/A") > -1)
                this._pattern[this.type].splice(this._pattern[this.type].indexOf("N/A"), 1);
        }

        return this._pattern[this.type];
    }
}
