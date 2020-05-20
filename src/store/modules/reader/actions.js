export function openReaderRequest(publicationId, page) {
    return {
        type: '@reader/OPEN_READER_REQUEST',
        payload: { publicationId, page },
    };
}

export function getPageRequest(publicationId, page) {
    return {
        type: '@reader/GET_PAGE_REQUEST',
        payload: { publicationId, page },
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

export function setHTMLPreparedRequest() {
    return {
        type: '@reader/SET_HTML_PREPARED_REQUEST',
    }
}

export function setHTMLPreparedSuccess(html) {
    return {
        type: '@reader/SET_HTML_PREPARED_SUCCESS',
        payload: { html }
    }
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
