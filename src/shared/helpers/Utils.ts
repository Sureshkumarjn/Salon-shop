import Toast from './Toast';
import moment from 'moment';
import { saveAs } from 'file-saver';

const formatDate = (date: string): string =>
    moment(date).format('DD MMMM YYYY');

const formatCommentDate = (date: string): string =>
    `${moment(date).format('HH:mm')} | ${moment(date).format('DD MMM YYYY')}`;

const formatEmail = (email: string): string => {
    const emailParts = email.split('@');
    const emailPart = email
        .split('@')[0]
        .split('')
        .map((value, index, array) =>
            index === 0 || index === array.length - 1 ? value : '*'
        )
        .join('');
    return `${emailPart}@${emailParts[1]}`;
};

const getInitial = (name = ''): string =>
    name
        .replace(/\s+/, ' ')
        .split(' ')
        .slice(0, 2)
        .map((v) => v && v[0].toUpperCase())
        .join('');

const handleErrorResponse = (error: any): void => {
    if (error && error.response) {
        const { data, status } = error.response;
        if (status === 400) {
            const { errors } = data;
            Toast.showErrorMessage(errors);
        } else if (status === 412) {
            const msg = data.message;
            Toast.showErrorMessage(msg);
        } else if (status === 500) {
            Toast.showErrorMessage('Please try again');
        }
    }
};

const handleSuccessResponse = (response: any): void => {
    const { message } = response.data;
    Toast.showSuccessMessage(message);
};

const fileExtension = (fileName: string): string => {
    if (fileName) {
        const url = fileName.split('?')[0];
        const extension = url.split('.').pop();
        return extension || '';
    }
    return '';
};

const fileNameFromUrl = (url: string): string => {
    if (url) {
        const fileName = url.split('/').pop();
        return fileName || '';
    }
    return '';
};

const appendBlobURL = (files: File[]): File[] => {
    files.map((file) =>
        Object.assign(file, {
            preview: URL.createObjectURL(file),
        })
    );
    return files;
};

const titleCase = (value: string): string => {
    if (value) {
        return value
            .trim()
            .split(' ')
            .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(' ');
    }
    return '';
};

const Capitalize = (value: any): string =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

const getFileType = (file: any): string =>
    file && file.type === 'application/pdf' ? 'pdf' : 'image';

const getQueryParamsFromFilter = (filters: any): any => {
    const queryFilter = [];
    for (let i = 0; i < filters.length; i += 1) {
        const column = filters[i];
        if (column.hasFilter && column.value !== '') {
            if (column.type === 'daterangepicker') {
                // const from = moment(filter.value[0]).format("YYYY-MM-DD");
                // const to = moment(filter.value[1]).format("YYYY-MM-DD");
                // queryFilter.push(`${key}=${from}/${to}`);
            } else {
                queryFilter.push(`${column.columnName}=${column.value}`);
            }
        }
    }
    return queryFilter.join('&');
};

const isImageFile = (file: File): boolean => {
    const imageMimes = ['image/png', 'image/jpeg'];
    return imageMimes.indexOf(file.type) > -1;
};

const downloadFile = (url: string): void => {
    saveAs(url, fileNameFromUrl(url));
};

const timerFromSeconds = (s: number): string => {
    if (!Number.isNaN(s)) {
        const sec = s % 60;
        const min = (s - sec) / 60;
        const timer = (min > 9 ? '' : '0') + min + (sec > 9 ? ':' : ':0') + sec;
        return timer;
    }
    return '';
};

export const Utils = {
    getInitial,
    handleSuccessResponse,
    handleErrorResponse,
    fileExtension,
    titleCase,
    Capitalize,
    getFileType,
    getQueryParamsFromFilter,
    appendBlobURL,
    formatDate,
    formatEmail,
    fileNameFromUrl,
    formatCommentDate,
    isImageFile,
    downloadFile,
    timerFromSeconds,
};
