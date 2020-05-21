export function openReaderRequest(publicationId, page) {
    return {
        type: '@reader/OPEN_READER_REQUEST',
        payload: { publicationId, page },
    };
}

export function getPageRequest(page) {
    return {
        type: '@reader/GET_PAGE_REQUEST',
        payload: { page },
    };
}

export function getPageSuccess(page) {
    return {
        type: '@reader/GET_PAGE_SUCCESS',
        payload: page,
    };
}

export function getHTMLRequest(url) {
    return {
        type: '@reader/GET_HTML_REQUEST',
        payload: { url },
    };
}

export function getHTMLSuccess(html) {
    return {
        type: '@reader/GET_HTML_SUCCESS',
        payload: { html },
    };
}

export function getCSSRequest(url) {
    return {
        type: '@reader/GET_CSS_REQUEST',
        payload: { url },
    };
}

export function getCSSSuccess(css) {
    return {
        type: '@reader/GET_CSS_SUCCESS',
        payload: { css },
    };
}

export function setPagesSuccess(html) {
    return {
        type: '@reader/SET_PAGES_SUCCESS',
        payload: { html },
    };
}

export function openReaderFailure(errorMessage) {
    return {
        type: '@reader/OPEN_READER_FAILURE',
        payload: { errorMessage },
    };
}

export function openReaderSuccess() {
    return {
        type: '@reader/OPEN_READER_SUCCESS',
    };
}
