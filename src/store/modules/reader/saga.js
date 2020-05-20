import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import api from '../../../services/api';

import style from '../../../assets/styles/style';
import {
    download,
    addStyleToHead,
    addStyleToHTML,
    addStyleToDocument,
} from '../utils';

import {
    getPageRequest,
    getPageSuccess,
    getHTMLRequest,
    getCSSRequest,
    getHTMLSuccess,
    getCSSSuccess,
    setHTMLPreparedRequest,
    setHTMLPreparedSuccess,
    openReaderFailure,
    openReaderSuccess,
} from './actions';

export function* openReaderStart({ payload }) {
    const { publicationId, page } = payload;
    yield put(getPageRequest(publicationId, page));
}

export function* getPage({ payload }) {
    const { publicationId, page } = payload;

    try {
        const response = yield call(
            api.get,
            `/page?publicationId=${publicationId}&page=${page}`
        );
        yield put(getPageSuccess(response.data));
    } catch (error) {
        yield put(openReaderFailure(error.errorMessage));
    }
}

export function* getContent() {
    const { htmlUrl, cssUrl } = yield select(state => state.reader.page);

    yield put(getHTMLRequest(htmlUrl));
    yield put(getCSSRequest(cssUrl));
}

export function* getHTML({ payload }) {
    const { url } = payload;

    try {
        const response = yield call(download, url);

        if (response.error) throw new Error(response);
        yield put(getHTMLSuccess(response.data));
    } catch (error) {
        yield put(openReaderFailure(error.errorMessage));
    }
}

export function* getCSS({ payload }) {
    const { url } = payload;
    const cssDefault = style();

    try {
        const response = yield call(download, url);

        if (response.error) {
            yield put(getCSSSuccess(cssDefault));
            throw new Error(response);
        }

        yield put(getCSSSuccess(response.data));
    } catch (error) {
        yield put(openReaderFailure(error.errorMessage));
    }
}

export function* openReaderEnd() {
    const content = yield select(state => state.reader.content);
    const { html, css } = content;

    if (html && css) yield put(openReaderSuccess());
}

export function* setHTMLPrepared() {
    const { html, css } = yield select(state => state.reader.content);
    let htmlPrepared = '';

    if (html && css) {
        const headTag = html.includes('<head') && html.includes('</head>');
        const htmlTag = html.includes('<html') && html.includes('</html>');

        inject: {
            if (headTag) {
                htmlPrepared = addStyleToHead(html, css);
                break inject;
            }

            if (htmlTag) {
                htmlPrepared = addStyleToHTML(html, css);
                break inject;
            }

            htmlPrepared = addStyleToDocument(html, css);
        }

        yield put(setHTMLPreparedSuccess(htmlPrepared));
    }
}

export default all([
    takeLatest('@reader/OPEN_READER_REQUEST', openReaderStart),
    takeLatest('@reader/GET_PAGE_REQUEST', getPage),
    takeLatest('@reader/GET_PAGE_SUCCESS', getContent),
    takeLatest('@reader/GET_HTML_REQUEST', getHTML),
    takeLatest('@reader/GET_CSS_REQUEST', getCSS),
    takeLatest('@reader/GET_HTML_SUCCESS', setHTMLPrepared),
    takeLatest('@reader/GET_CSS_SUCCESS', setHTMLPrepared),
    takeLatest('@reader/SET_HTML_PREPARED_SUCCESS', openReaderEnd),
]);
