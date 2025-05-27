import Swal from 'sweetalert2';

export function commonAlert(title: string, text: string, icon: any) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn w-24 btn-success',
            cancelButton: 'btn btn-danger w-24 ltr:mr-3 rtl:ml-3',
            popup: 'sweet-alerts',
        },
        buttonsStyling: false,
    });
    return swalWithBootstrapButtons.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: `Confrim`,
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        padding: '2em',
    });
}

export function contactPersonAlert(title: string, text: string, icon: any, confirmButtonText: any, cancelButtonText: any) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger ltr:mr-3 rtl:ml-3',
            popup: 'sweet-alerts',
        },
        buttonsStyling: false,
    });
    return swalWithBootstrapButtons.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        reverseButtons: true,
        padding: '2em',
    });
}

export default { contactPersonAlert, commonAlert };
