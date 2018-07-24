import {reloadIcheck} from "../utils/reload-helpers.js";
import {CompetenceView} from "./CompetenceView.js";

export class EvaluationView {
    constructor(tab,content) {
        this._tab = tab;
        this._content = content;
        this._CompetenceView = new CompetenceView();
    }

    update(list){
        this._tab.innerHTML = this._templateTab(list.evaluations);
        this._content.innerHTML = this._templateContent(list.evaluations);
        list.evaluations.map((e) => {
            let object_div = document.querySelector("#competence_"+e.index);
            e.CompetenceController.reload(object_div,e.index);

            reloadIcheck("#section_na_"+e.index);
            reloadIcheck("#section_evaluter_"+e.index);
            reloadIcheck("#section_required_"+e.index);
        });
    }

    _templateTab(element){
        return `${element.map(e =>{
            let active = "";
            if(e.index == 1)
            active = "active";

            return `<li class="${active}">
                <a data-toggle="tab" href="#tab-${e.index}" id="tab-evaluation-${e.index}">${e.name}</a>
            </li>`;
        }).join("")}`;
    }

    _templateContent(element){
        return `${element.map(e => {
            let active = ""
            if(e.index == 1)
                active = "active";

            return `
            <div id="tab-${e.index}" class="tab-pane ${active}">
                <div class="panel-body">
                    <div class="col-sm-12 text-center">
                        <div class="row">
                            <div class="col-sm-12 text-right m-b-md">
                                <button class="btn btn-xs btn-danger" id="deleteEvaluation_${e.index}" index="${e.index}">Deletar Seção <i class="fa fa-close"></i></button>
                            </div>
                            <div class="col-sm-6 text-right">
                                <label class="col-sm-3 control-label" style="padding-top: 5px">Título da seção</label>
                                <div class="col-lg-9">
                                    <input type="text" class="form-control nameSection" placeholder="Título da seção" value="${e.name}" index="${e.index}" id="section_name_${e.index}">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label class="col-sm-4 control-label" style="padding-top: 5px">Escala de Avaliação</label>
                                <div class="col-sm-8">
                                    <select class="form-control m-b" name="account" index="${e.index}" id="section_type_${e.index}">
                                        <option value="1" ${e.type == 1? "selected":""}>Nunca... Sempre</option>
                                        <option value="2" ${e.type == 2? "selected":""}>Insatisfatório... Excepcional</option>
                                        <option value="3" ${e.type == 3? "selected":""}>Discordo fortemente... Concordo fortemente</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3" style="padding-top: 5px">
                                <div class="i-checks"><label> <input type="checkbox" class="na_enabled" index="${e.index}" id="section_na_${e.index}" ${e.na?"checked":""}> <i></i> Habilitar não se aplica </label></div>
                            </div>
                            <div class="col-sm-4" style="padding-top: 10px">
                                <div class="i-checks"><label> <input type="checkbox" class="evaluterComment" index="${e.index}" id="section_evaluter_${e.index}" ${e.evaluterComment?"checked":""}> <i></i> Habilitar comentário do avaliador por competência</label></div>
                            </div>
                            <div class="col-sm-3" style="padding-top: 10px">
                                <div class="i-checks"><label> <input type="checkbox" class="commentRequired" index="${e.index}" id="section_required_${e.index}" ${e.evaluterComment?"":"disabled"} ${e.required?"checked":""}> <i></i> Habilitar comentário obrigatório </label></div>
                            </div>
                            <div class="col-sm-2" style="padding-top: 10px">
                                <label><span id="qtdCompetence_${e.index}">0</span> Competência(s)</label>
                            </div>
                        </div>
                    </div>
                    <div class="row p-sm" id="competence_${e.index}">

                    </div>
                    <button class="btn btn-primary col-sm-12 m-t-xl" id="addCompetence_${e.index}" index="${e.index}"><i class="fa fa-plus"></i> Nova competência</button>
                </div>
            </div>`;
        }).join("")}`;
    }

    preview(json){
        return `${json.map((e,i) => `
        <div class="row m-b-md">
            <div class="col-sm-12 text-center" style="padding-top: 5px">
                <h2>${(i+1)} - ${e.name}</h2>
            </div>
            <div class="col-sm-12 m-b-md">
                ${e.competences.map((c,j) => `
                    <h4>${(i+1)}.${(j+1)} ${c.name}</h4>
                    <p>${c.description}</p>
                    <div class="col-sm-12 m-b-md">
                    ${c.behaviors ?
                        `<div class="col-sm-12 m-b-md">${c.answers.map((a,k) => `
                            <div class="col-sm-12">
                                <h4>${(i+1)}.${(j+1)}.${(k+1)} ${a.title}</h4>
                            </div>
                            ${a.options.map((o) => `
                                <div class="col-sm-2">
                                    <div class="i-checks preview-radio"><label><input type="radio" disabled> <i></i> ${o} </label></div>
                                </div>
                            `).join("")}
                        `).join("")}</div>`
                    :
                        `${c.questions.map((q) => `
                            <div class="col-sm-2">
                                <div class="i-checks preview-radio"><label><input type="radio" disabled> <i></i> ${q} </label></div>
                            </div>
                        `).join("")}`
                    }
                    </div>
                    
                `).join("")}
            </div>
            ${e.evaluterComment?`
                <div class="col-sm-12">
                    <h3>Comentário do avaliador</h3>
                    <textarea class="form-control" disabled></textarea>
                </div>
            `:``}
            
        </div>
        <hr>
        `).join("")}`;
    }
}
