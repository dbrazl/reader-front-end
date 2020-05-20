import { all } from 'redux-saga/effects';

import reader from './reader/saga';

export default function* rootSaga() {
    return yield all([reader]);
}
