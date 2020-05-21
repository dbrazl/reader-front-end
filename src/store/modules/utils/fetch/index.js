import { put } from 'redux-saga/effects';
import { captureErrorRequest } from '../../log/actions';
import RNFetchBlob from 'rn-fetch-blob';

function validURL(url) {
    const exist = !!url;
    const http = url?.includes('http://');
    const https = url?.includes('https://');
    const com = url?.includes('.com');

    validation: {
        if (!exist) break validation;
        if (!http && !https) break validation;
        if (!com) break validation;

        return true;
    }

    return false;
}

function getFileType(url) {
    const index = url.lastIndexOf('.');
    return url.slice(index + 1);
}

function blobError(url, http, message) {
    return {
        error: true,
        http,
        message,
        config: {
            url,
            baseURL: null,
            method: 'get',
        },
    };
}

export function download(url) {
    const ERROR_MESSAGES = {
        URL: 'BLOB: URL não é válida.',
        DOWNLOAD: `BLOB: Não é possível fazer o download do ${getFileType(
            url
        )}.`,
    };

    return new Promise((success, reject) => {
        if (!validURL(url)) reject(blobError(url, null, ERROR_MESSAGES.URL));

        RNFetchBlob.fetch('GET', url).then(response => {
            const status = response.info().status;

            if (status === 200 || status === 304)
                success({
                    data: response.text(),
                });
            else success(blobError(url, status, ERROR_MESSAGES.DOWNLOAD));
        });
    });
}

export function getHttp(error) {
    let http = '';

    for (const letter of error.message) {
        const char = parseInt(letter);
        if (Number.isInteger(char)) http = http.concat(letter);
    }

    return parseInt(http);
}

export function errorMessage(error) {
    const message = error.message;

    const ERROR_MESSAGES = {
        500: 'Não foi possível conectar com o servidor',
        400: 'Erro ao requsitar a página',
        401: 'A busca da página não foi autorizada',
        404: 'A página não foi encontrada',
        BLOB: message.split('BLOB: ')[1],
    };

    if (message.includes('500')) return ERROR_MESSAGES[500];

    if (message.includes('400')) return ERROR_MESSAGES[400];

    if (message.includes('401')) return ERROR_MESSAGES[401];

    if (message.includes('404')) return ERROR_MESSAGES[404];

    if (message.includes('BLOB')) return ERROR_MESSAGES.BLOB;

    return 'Houve um problema na busca da API';
}

export function* createReport(error, errorMessage) {
    const message = errorMessage || errorMessage(error);

    const { http, config } = error;
    const { url, method, baseURL } = config;

    const endpoint = baseURL ? url.split(baseURL)[1] : url;

    const report = {
        http: http ? http : getHttp(error),
        description: message,
        endpoint,
        method,
    };

    yield put(captureErrorRequest(report));
}
