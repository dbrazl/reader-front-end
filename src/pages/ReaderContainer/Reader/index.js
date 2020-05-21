import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dimensions } from 'react-native';
import View from './view';

import { openReaderRequest } from '../../../store/modules/reader/actions';

const Index = () => {
    const [width, setWidth] = useState(Dimensions.get('window').width);
    const [height, setHeight] = useState(Dimensions.get('window').height);
    const [loading, setLoading] = useState(false);
    const [html, setHtml] = useState('');
    const [errorStatus, setErrorStatus] = useState({});

    const { htmlPrepared } = useSelector(state => state.reader.content);
    const { error, errorMessage } = useSelector(state => state.reader.status);

    const dispatch = useDispatch();

    useEffect(() => {
        const publicationId = 1,
            page = 1;
        Dimensions.addEventListener('change', orientationChange);
        dispatch(openReaderRequest(publicationId, page));

        return () => {
            Dimensions.removeEventListener('change');
        };
    }, []);

    useEffect(() => setHtml(htmlPrepared), [htmlPrepared]);

    useEffect(
        () =>
            setErrorStatus({
                error,
                errorMessage,
            }),
        [error, errorMessage]
    );

    function orientationChange(event) {
        const { width, height } = event.screen;
        setWidth(width);
        setHeight(height);
    }

    function onLoad() {
        setLoading(true);
    }

    const viewProps = {
        html,
        dimensions: {
            width,
            height,
        },
        status: {
            loading,
            errorStatus,
            loading,
            onLoad,
        },
    };

    return <View viewProps={viewProps} />;
};

export default Index;
