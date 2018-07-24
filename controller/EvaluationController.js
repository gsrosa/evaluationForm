import {Evaluation} from "../model/Evaluation.js";
import {ListEvaluations} from "../model/ListEvaluations.js";
import {EvaluationView} from "../view/EvaluationView.js";
import {Bind} from "../helpers/Bind.js";
import {Alerts} from "../helpers/Alerts.js";
import {reloadIcheck} from "../utils/reload-helpers.js";

import {CompetenceController} from "./CompetenceController.js";

export class EvaluationController {
    constructor(tab,content){
        this._tab       = tab;
        this._content   = content;

        this._view      = new EvaluationView(this._tab,this._content);

        this._ListEvaluations = new Bind(
            new ListEvaluations(),
            this._view,
            this._reloadEvents,
            "add","remove");
    }

    add(){
        this._ListEvaluations.add(this._newEvaluation(),this._ListEvaluations);
        Alerts.add();
    }
    _newEvaluation(){
        return new Evaluation("Nova seção",(this._ListEvaluations.evaluations.length+1),new CompetenceController((this._ListEvaluations.evaluations.length+1)))
    }

    remove(element){
        Alerts.remove(() =>
            this._ListEvaluations
            .remove(element.target.getAttribute("index")));
    }

    get quantityEv(){
        return this._ListEvaluations.evaluations.length;
    }

    addCompetence(index){
        this.ListEvaluations.addCompetence(index);
    }

    sendData(){
        console.log(this._generateJson())
    }

    preview(element){
        element.html(this._view.preview(this._generateJson()));
        reloadIcheck(".preview-radio");
    }

    _generateJson(){
        let json = [];
        this._ListEvaluations.evaluations.forEach((evaluation) =>{
            let ev = {};
            ev.name             = evaluation.name;
            ev.type             = evaluation.type;
            ev.na               = evaluation.na;
            ev.evaluterComment  = evaluation.evaluterComment;
            ev.required         = evaluation.required;
            ev.competences = [];

            evaluation.competences.forEach((competences) => {
                let cp = {};
                cp.name = competences.name;
                cp.description = competences.description;
                cp.behaviors = competences.behaviors;
                cp.questions = competences.questions;
                cp.answers = [];

                competences.answers.forEach((questions) =>{
                    let q = {};
                    q.title = questions.title;
                    q.options = questions.options;
                    if(questions.visible)
                        cp.answers.push(q);
                });

                if(competences.visible)
                    ev.competences.push(cp);
            });

            json.push(ev);
        });

        return json;
    }

    _reloadEvents(list){
        list.evaluations.map((e) => {
            let n_array = list.evaluations[e.index-1].competences.filter((x)=> x.visible == true);
            $("#qtdCompetence_"+e.index).html(n_array.length);

            let object_div = document.querySelector("#competence_"+e._index);

            $("#deleteEvaluation_"+e.index)
                .on("click",(element) => {
                    list.ElementReference(element.target.getAttribute("index"));
            });

            $("#section_name_"+e.index)
                .on("change",(element) => {
                    e.setName(element.target.value);
                    $("#tab-evaluation-"+e.index).html(element.target.value);
                });

            $("#section_name_"+e.index)
                    .on("keypress",(element) => {
                        e.setName(element.target.value);
                        $("#tab-evaluation-"+e.index).html(element.target.value);
                    });

            $("#section_type_"+e.index)
                .on("change",(element) => {
                    e.setType(parseInt(element.target.value));
                });

            $("#section_na_"+e.index)
                .on("ifChanged",(element) => {
                    e.setNa(element.target.checked);
                });

            $("#section_evaluter_"+e.index)
                .on("ifChanged",(element) => {
                    e.setEvaluterComment(element.target.checked);
                    if(element.target.checked)
                        $("#section_required_"+e.index).iCheck("enable");
                    else
                        $("#section_required_"+e.index).iCheck("disable");
                });

            $("#section_required_"+e.index)
                .on("ifChanged",(element) => {
                    e.setRequired(element.target.checked);
                });

            $("#addCompetence_"+e.index)
                .on("click",(element) => {
                    list.addCompetence(element.target.getAttribute("index"),object_div);

                    let n_array = list.evaluations[e.index-1].competences.filter((x)=> x.visible == true);
                    $("#qtdCompetence_"+e.index).html(n_array.length);
                });
        });
    }
}
