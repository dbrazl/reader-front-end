import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import style from '../../../assets/styles/style';

import api from '../../../services/api';

import {
    getPageRequest,
    getPageSuccess,
    getHTMLRequest,
    getCSSRequest,
    getHTMLSuccess,
    getCSSSuccess,
    setPagesSuccess,
    openReaderFailure,
    openReaderSuccess,
} from './actions';

import { download, errorMessage, createReport } from '../utils/fetch';
import {
    addStyleToHead,
    addStyleToHTML,
    addStyleToDocument,
} from '../utils/inject';

export function* openReaderStart({ payload }) {
    const { page } = payload;
    yield put(getPageRequest(page));
}

export function* getPage({ payload }) {
    const { page } = payload;
    const { publicationId } = yield select(state => state.reader.book);

    try {
        const response = yield call(
            api.get,
            `/page?publicationId=${publicationId}&page=${page}`
        );
        yield put(getPageSuccess(response.data));
    } catch (error) {
        yield* errorHandler(error);
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

        if (response.error) throw response;
        yield put(getHTMLSuccess(response.data));
    } catch (error) {
        yield* errorHandler(error);
    }
}

export function* getCSS({ payload }) {
    const { url } = payload;
    const cssDefault = style();

    try {
        const response = yield call(download, url);

        if (response.error) {
            yield put(getCSSSuccess(cssDefault));
            throw response;
        }

        yield put(getCSSSuccess(response.data));
    } catch (error) {
        yield* errorHandler(error);
    }
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

        yield put(setPagesSuccess(htmlPrepared));
    }
}

export function* openReaderEnd() {
    const content = yield select(state => state.reader.content);
    const { html, css } = content;

    if (html && css) yield put(openReaderSuccess());
}

export function* errorHandler(error) {
    const message = errorMessage(error);
    yield* createReport(error, message);
    yield put(openReaderFailure(message));
}

export default all([
    takeLatest('@reader/OPEN_READER_REQUEST', openReaderStart),
    takeLatest('@reader/GET_PAGE_REQUEST', getPage),
    takeLatest('@reader/GET_PAGE_SUCCESS', getContent),
    takeLatest('@reader/GET_HTML_REQUEST', getHTML),
    takeLatest('@reader/GET_CSS_REQUEST', getCSS),
    takeLatest('@reader/GET_HTML_SUCCESS', setHTMLPrepared),
    takeLatest('@reader/GET_CSS_SUCCESS', setHTMLPrepared),
    takeLatest('@reader/SET_PAGES_SUCCESS', openReaderEnd),
]);
