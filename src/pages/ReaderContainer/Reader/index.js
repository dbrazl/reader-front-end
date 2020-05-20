import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Dimensions } from 'react-native';
import View from './view';

import api from '../../../services/api';

import { openReaderRequest } from '../../../store/modules/reader/actions';

const Index = ({ navigation }) => {
    const [width, setWidth] = useState(Dimensions.get('window').width);
    const [height, setHeight] = useState(Dimensions.get('window').height);
    const [loading, setLoading] = useState(false);
    const [uri, setUri] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        Dimensions.addEventListener('change', orientationChange);
        dispatch(openReaderRequest(1, 0));

        return () => {
            Dimensions.removeEventListener('change');
        };
    }, []);

    async function getData() {
        await getHTMLRequest();
    }

    function orientationChange(event) {
        const { width, height } = event.screen;
        setWidth(width);
        setHeight(height);
    }

    function onLoad() {
        setLoading(true);
    }

    const viewProps = {
        navigation,
        uri,
        width,
        height,
        loading,
        onLoad,
    };

    return <View viewProps={viewProps} />;
};

export default Index;
