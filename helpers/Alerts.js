export class Alerts {
    static add(){
        swal({
            title: "Concluded",
            text: "Evaluation create with success",
            type: "success"
        });
    }

    static success(title,message){
        swal({
            title: title,
            text: message,
            type: "success"
        });
    }

    static remove(fn){
        return swal({
            title: "Warning",
            text: "Do you want delete this item?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },()=>{
            fn();
            swal("Deleted!", "This item was removed with success.", "success");
        });
    }
}
