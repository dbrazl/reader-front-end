import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';

import { captureErrorSuccess, sendLogSuccess } from './actions';

import { readFile, writeFile, appendError } from '../utils/stream';
import { createReport } from '../utils/fetch';

export function* captureError() {
    const log = yield select(state => state.log.report);

    const file = yield call(readFile);
    console.tron.log(file);

    if (!!file) yield call(appendError, log, file);
    else yield call(writeFile, log);

    yield put(captureErrorSuccess());
}

export function* sendLog() {
    const file = yield call(readFile);
    const json = JSON.parse(file);

    try {
        if (!!file) yield call(api.post, '/log', json);
        yield put(sendLogSuccess());
    } catch (error) {
        yield* createReport(error);
    }
}

export default all([
    takeLatest('@log/CAPTURE_ERROR_REQUEST', captureError),
    takeLatest('@log/SEND_LOG_REQUEST', sendLog),
]);
