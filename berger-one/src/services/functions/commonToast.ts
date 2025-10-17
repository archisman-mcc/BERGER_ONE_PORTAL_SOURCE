import Swal from 'sweetalert2';

export function commonSuccessToast(msg: string) {
    const toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        timerProgressBar: true,
        background: '#10b981', // Green background for success
        color: '#ffffff', // White text
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
        timer: 3000, // 10 Seconds
        timerProgressBar: true,
        text: text,
        showCloseButton: true,
        background: '#ef4444', // Red background for error
        color: '#ffffff', // White text
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
        background: '#ef4444', // Red background for error
        color: '#ffffff', // White text
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
        background: '#f59e0b', // Amber background for warning
        color: '#ffffff', // White text
    });
    return toast.fire({
        title: '',
    });
}

export default { commonErrorToast, commonSuccessToast };
