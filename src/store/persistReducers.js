import storage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
    const persistedReducer = persistReducer(
        {
            key: 'reader',
            storage,
            whitelist: [],
        },
        reducers
    );

    return persistedReducer;
};
