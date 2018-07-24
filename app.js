import {EvaluationController} from "./controller/EvaluationController.js";

let Evaluation = new EvaluationController();

document
    .querySelector("#addEvaluation")
    .onclick = Evaluation.add.bind(Evaluation);

document
    .querySelector("body")
    .onload = Evaluation.add.bind(Evaluation);

document
    .querySelector("#testeJson")
    .onclick = Evaluation.sendData.bind(Evaluation);

document
    .querySelector("#preview")
    .onclick = Evaluation.preview.bind(Evaluation);
