export const getValuesFromId = (...ids) => {
    return ids.reduce((final,element) => { final.push($(element).val()); return final; },[]);
}

export const clearFieldsFromId = (...ids) => {
    return ids.map((element) => $(element).val(""));
}

export const reloadTouchspin = () => {
    $(".touchspin").TouchSpin({
        min:1,
        buttondown_class: 'btn btn-white',
        buttonup_class: 'btn btn-white'
    });
}

export const reloadIcheck = (c=".i-checks") => {
    $(c).iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
}
