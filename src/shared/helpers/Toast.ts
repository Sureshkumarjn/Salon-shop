import { toast } from 'react-toastify';

const showSuccessMessage = (message: string): void => {
    toast.success(message);
};

const showInfoMessage = (message: string): void => {
    toast.info(message);
};

const showErrorMessage = (message: string): void => {
    toast.error(message);
};

export default { showSuccessMessage, showInfoMessage, showErrorMessage };
