import {ListQuestions} from "../model/ListQuestions.js";
import {Questions} from "../model/Questions.js";
import {QuestionsView} from "../view/QuestionsView.js";
import {Bind} from "../helpers/Bind.js";

export class QuestionsController {
    constructor() {
        this._view = new QuestionsView();

        this._ListQuestions = new Bind(
            new ListQuestions(),
            this._view,
            this._events,
            "add","reload"
        );
    }

    reload(content){
        this._view.setContent(content);
        this._ListQuestions.reload();
    }

    setOptions(options){
        this._options = options;
        this._ListQuestions.questions.map((e) => {
            e.setOptions(options);
        });
    }

    setIndex(index){
        this._index = index;
    }

    add(content,index){
        this._view.setContent(content);
        this._view.setIndex(index);

        this._index = index;

        this._ListQuestions.add(this._newQuestion());
    }

    get ListQuestions(){
        return this._ListQuestions;
    }

    _newQuestion(){
        return new Questions("Novo Comportamento",this._options,this._index);
    }

    _events(list){
        list.questions.map((e,i)=>{
            $("#titleQuestion_"+e.index+"_"+i)
                .on("change",(element) => {
                    e.setTitle(element.target.value);
                    console.log(e.title);
                });

            $("#deleteQuestion_"+e.index+"_"+i)
                .on("click",(element) => {
                    e.setVisible(false);
                    
                    let index_c = element.currentTarget.getAttribute("index_c");
                    let index_q = element.currentTarget.getAttribute("index_q");

                    $("#question_"+index_c+"_"+index_q).fadeOut();
                });
        });
    }
}
