export const addCompetence = (element) =>{
    return [
        element.target.getAttribute("index"),
        "addCompetence"
    ];
}

export const getType = (element) => {
    return [
        element.target.value,
        element.target.getAttribute("index"),
        "setType"
    ];
}

export const getSection = (element) => {
    let value = element.target.value;
    let index = element.target.getAttribute("index");

    $("#tab-evaluation-"+index).html(value);

    return [
        value,
        index,
        "setName"
    ];
}

export const getNa = (element) => {
    return [
        element.target.checked,
        element.target.getAttribute("index"),
        "setNa"
    ];
}

export const getRequired = (element) => {
    return [
        element.target.checked,
        element.target.getAttribute("index"),
        "setRequired"
    ];
}

export const getEvaluterComment = (element) => {
    return [
        element.target.checked,
        element.target.getAttribute("index"),
        "setEvaluterComment"
    ];
}
