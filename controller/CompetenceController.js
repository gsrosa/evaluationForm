import {ListCompetence} from "../model/ListCompetence.js";
import {Competence} from "../model/Competence.js";
import {CompetenceView} from "../view/CompetenceView.js";
import {Bind} from "../helpers/Bind.js";

import {QuestionsController} from "./QuestionsController.js";

export class CompetenceController {
    constructor(index) {
        this._index = index;
        this._view = new CompetenceView();

        this._ListCompetence = new Bind(
            new ListCompetence(),
            this._view,
            this._events,
            "add","reload","setComment","setCompetenceQuestion"
        );
    }

    add(content,index){
        this._view.setContent(content);
        this._view.setIndex(index);

        this._ListCompetence.add(this._newCompetence(),index);
    }

    reload(content,index){
        this._view.setContent(content);
        this._view.setIndex(index);
        this._ListCompetence.reload();
    }

    setQuestions(question){
        this._questions = question;
    }

    setIndex(i){
        this._index = i;
    }

    get list(){
        return this._ListCompetence.competences;
    }

    get ListCompetence(){
        return this._ListCompetence;
    }

    _newCompetence(){
        return new Competence("Nova competência","Descrição",(this._ListCompetence.competences.length+1),this._questions,new QuestionsController());
    }

    _events(list){
        list.competences.map((e,i) => {
            $("#deleteCompetence_"+e.index+"_"+i)
                .on("click",(element) => {
                    e.setVisible(false);

                    let index_e = element.currentTarget.getAttribute("index_e");
                    let index_c = element.currentTarget.getAttribute("index_c");

                    $("#competence_"+index_e+"_"+index_c).fadeOut();

                    let n_array = list.competences.filter((x)=> x.visible == true);
                    $("#qtdCompetence_"+e.index).html(n_array.length);
                });

            $("#nameCompetence_"+e.index+"_"+i)
                .on("change",(element) => {
                    e.setName(element.target.value);
                });
            $("#nameCompetence_"+e.index+"_"+i)
                .on("keypress",(element) => {
                    e.setName(element.target.value);
                });


            $("#descriptionCompetence_"+e.index+"_"+i)
                .on("change",(element) => {
                    e.setDescription(element.target.value);
                });
            $("#descriptionCompetence_"+e.index+"_"+i)
                .on("keypress",(element) => {
                    e.setDescription(element.target.value);
                });

            $('.tooltip_competence').tooltip();

            $("input[name=behaviors_radio_"+e.index+"_"+i+"]")
                .on("ifChanged",(element) => {
                    let index_e = element.target.getAttribute("index_e");
                    let index_c = element.target.getAttribute("index_c");

                    if(element.target.value == "false"){
                        e.setBehaviors(false);
                        $("#behavior_"+e.index+"_"+i).fadeOut(300);
                        $("#answers_"+e.index+"_"+i).fadeOut(300);
                    }
                    else {
                        e.setBehaviors(true);
                        $("#behavior_"+e.index+"_"+i).fadeIn(300);
                        $("#answers_"+e.index+"_"+i).fadeIn(300);
                    }
                });

            $("#addQuestion_"+e.index+"_"+i)
                .on("click",(element) => {
                    let index_e = element.target.getAttribute("index_e");
                    let index_c = element.target.getAttribute("index_c");

                    let object_div = document.querySelector("#answers_content_"+index_e+"_"+index_c);

                    list.addQuestion(index_c,object_div);
                });
        });
    }
}
