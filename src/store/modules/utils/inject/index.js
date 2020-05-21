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
