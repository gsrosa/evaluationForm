import {reloadIcheck} from "../utils/reload-helpers.js";
import {QuestionsView} from "./QuestionsView.js";

export class CompetenceView {
    setContent(content){
        this._content = content;
    }
    setIndex(index){
        this._index = index;
        return "";
    }

    update(list){
        this._content.innerHTML = this._template(list);

        list.competences.map((e,i) => {

            let object_div = document.querySelector("#answers_content_"+e.index+"_"+i);
            e.QuestionsController.reload(object_div);

            reloadIcheck(".behaviors_radio_"+this._index+"_"+i);
            reloadIcheck(".questions-simple");
        });
    }

    _template(element){
        return `${element.competences.map((e,i) => `
            <div class="row" id="competence_${e.index}_${i}" ${e.visible ?``:`style="display:none"`}>
                <div class="col-sm-12 border-top p-md m-t-sm">
                    <div class="col-sm-12 text-right m-b-xs">
                        <button class="btn btn-xs btn-danger" id="deleteCompetence_${e.index}_${i}" index_e="${e.index}" index_c="${i}">Deletar competência <i class="fa fa-close"></i></button>
                    </div>
                    <div class="col-sm-12 p-sm">
                        <h3><b>Nome da Competência</b></h3>
                        <div class="col-lg-12">
                            <input type="text" class="form-control" id="nameCompetence_${this._index}_${i}" placeholder="Título da competência" value="${e.name}" index_e="${this._index}" index_c="${i}">
                        </div>
                    </div>
                    <div class="col-sm-6 p-sm">
                        <div class="col-sm-12 p-sm">
                            <h3>Descrição</h3>
                            <div class="col-lg-12">
                                <textarea type="text" class="form-control" id="descriptionCompetence_${this._index}_${i}" placeholder="Descrição da competência" index_e="${this._index}" index_c="${i}">${e.description}</textarea>
                            </div>
                        </div>
                        <div class="col-sm-12 m-t-md">
                            <div class="col-sm-12">
                                <div class="i-checks behaviors_radio_${this._index}_${i}">
                                    <label class"tooltip_competence" data-toggle="tooltip" data-placement="top" title="Nesta opção, apenas a competência é avaliada, de acordo com as métricas ao lado">
                                        <input type="radio" class="behaviors" value="false" name="behaviors_radio_${this._index}_${i}" index_e="${this._index}" index_c="${i}" ${e.behaviors?"":"checked"}>
                                        Avaliar somente a competência
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="i-checks behaviors_radio_${this._index}_${i}">
                                    <label class"tooltip_competence" data-toggle="tooltip" data-placement="top" title="Nesta opção, existe a possibilidade de adicionar comportamentos relacionados a competência para serem avaliados">
                                        <input type="radio" class="behaviors" value="true" name="behaviors_radio_${this._index}_${i}" index_e="${this._index}" index_c="${i}" ${e.behaviors?"checked":""}>
                                        Avaliar comportamentos relacionados a essa competência
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 m-t-md" id="behavior_${this._index}_${i}" ${e.behaviors? "":'style="display:none"'}>
                            <button class="btn btn-primary col-sm-12" id="addQuestion_${this._index}_${i}" index_e="${this._index}" index_c="${i}"><i class="fa fa-plus"></i> Adicionar comportamento</button>
                        </div>
                    </div>
                    <div class="col-sm-6 p-lg border-left" id="questions_${this._index}_${i}">
                        <div class="col-sm-12 text-center"><h3>Métrica de avaliação</h3></div>
                        ${e.questions.map(element =>
                            `<div class="i-checks questions-simple m-t-sm"><label> <input type="radio" disabled> <i></i>${element}</label></div>`).join("")}
                    </div>
                </div>
                <div class="col-sm-12 p-sm text-center" id="answers_${this._index}_${i}" id="behavior_${this._index}_${i}" ${e.behaviors? "":'style="display:none"'}>
                    <h4>Comportamentos relacionados à competencia</h4>
                    <div class="col-lg-12 text-left" id="answers_content_${this._index}_${i}">

                    </div>
                </div>
                ${element.comment ?
                    `<div class="col-sm-12 p-sm">
                        <h4>Comentário do avaliador</h4>
                        <div class="col-lg-12">
                            <textarea class="form-control" disabled></textarea>
                        </div>
                    </div>`
                : ""}
            </div>
        `).join("")}`;
    }
}
