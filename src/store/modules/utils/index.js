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

export function download(url) {
    const ERROR_MESSAGES = {
        URL: "Error : URL isn't valid.",
        DOWNLOAD: "Error : Can't download the html.",
    };

    return new Promise((success, reject) => {
        if (!validURL(url))
            reject({
                error: true,
                errorMessage: ERROR_MESSAGES.URL,
            });

        RNFetchBlob.fetch('GET', url).then(response => {
            const status = response.info().status;

            if (status === 200)
                success({
                    data: response.text(),
                });
            else
                reject({
                    error: true,
                    errorMessage: ERROR_MESSAGES.DOWNLOAD,
                });
        });
    });
}

export function addStyleToHead(html, css) {
    let injectCSS = `
        <style>
            ${css}
        </style>
    `;

    let [head, rest] = html.split('</head>');
    head = `${head.concat(injectCSS)}  </head>`;

    return head.concat(rest);
}

export function addStyleToHTML(html, css) {
    const injectCSS = `
        <head>
            <style>
                ${css}
            </style>
        </head>
    `;

    const [beforeHTML, rest1] = html.split('<html');
    const [htmlProperties] = rest1.split(`>`);

    const index = rest1.indexOf('>');
    const rest2 = rest1.slice(index + 1);

    return `${beforeHTML} <html${htmlProperties}> ${injectCSS} ${rest2}`;
}

export function addStyleToDocument(html, css) {
    const injectCSS = `
        <head>
            <style>
                ${css}
            </style>
        </head>
    `;

    return `${injectCSS} ${html}`;
}
