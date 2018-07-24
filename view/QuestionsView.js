export class QuestionsView {
    setContent(content){
        this._content = content;
    }
    setIndex(index){
        this._index = index;
    }
    update(list){
        this._content.innerHTML = this._template(list);
    }

    _template(list){
        return `${list.questions.map((e,i) => `
            ${e.visible ? `
            <div class="col-sm-12 p-xs m-t-xs" id="question_${this._index}_${i}" style="border: 1px solid #ccc">
                    <h3 class="col-sm-1"><b>Título</b></h3>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="titleQuestion_${this._index}_${i}" placeholder="Título do Comportamento" value="${e.title}">
                    </div>
                    <div class="col-sm-1 text-right">
                        <button class="btn btn-danger" id="deleteQuestion_${e.index}_${i}" index_c="${e.index}" index_q="${i}"><i class="fa fa-close"></i></button>
                    </div>
            </div>
            `:``}
        `).join("")}`;
    }
}
