import { combineReducers } from 'redux';

import reader from './reader/reducer';
import log from './log/reducer';

export default combineReducers({
    reader,
    log,
});
