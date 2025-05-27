import Swal from 'sweetalert2';

export function commonSuccessToast(msg: string) {
    const toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        timerProgressBar: true,
        customClass: {
            popup: `color-success`,
        },
    });
    return toast.fire({
        icon: 'success',
        title: msg,
        padding: '10px 20px',
    });
}

export function commonErrorToast(text: string) {
    const toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 10000, // 10 Seconds
        timerProgressBar: true,
        text: text,
        showCloseButton: true,
        customClass: {
            popup: `color-danger`,
        },
    });
    return toast.fire({
        title: '',
    });
}

export async function commonErrorToastMulty(text: string) {
    await Swal.fire({
        icon: 'error',
        title: '',
        text: text,
        position: 'bottom-start',
        toast: true,
        showConfirmButton: false,
        timer: 0,
        timerProgressBar: true,
        showCloseButton: true,
        customClass: {
            popup: 'color-danger',
        },
    });
}

export function commonWarningToast(text: string) {
    const toast = Swal.mixin({
        icon: 'warning',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000, // 3 Seconds
        timerProgressBar: true,
        text: text,
        showCloseButton: true,
        customClass: {
            popup: `color-warning`,
        },
    });
    return toast.fire({
        title: '',
    });
}

export default { commonErrorToast, commonSuccessToast };
