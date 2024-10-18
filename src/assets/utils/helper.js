import Swal from "sweetalert2";

export function setAlert (title, text, type = 'success'){
    Swal.fire({
        icon: type,
        title:title,
        text:text,
        confirmButtonText: 'Cerrar',
        timerProgressBar: true,
        showCloseButton: true,
    });
};

