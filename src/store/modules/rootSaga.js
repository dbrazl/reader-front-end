import { all } from 'redux-saga/effects';

import reader from './reader/saga';
import log from './log/saga';

export default function* rootSaga() {
    return yield all([reader, log]);
}
