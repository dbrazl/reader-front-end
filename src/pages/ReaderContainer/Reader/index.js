import React, { useState, useEffect } from 'react';

import { Dimensions } from 'react-native';
import View from './view';
import RNFetch from 'rn-fetch-blob';

export default function Index({ navigation }) {
    const [width, setWidth] = useState(Dimensions.get('window').width);
    const [height, setHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        Dimensions.addEventListener('change', orientationChange);

        return () => {
            Dimensions.removeEventListener('change');
        };
    }, []);

    function orientationChange(event) {
        const { width, height } = event.screen;
        setWidth(width);
        setHeight(height);
    }

    const viewProps = {
        navigation,
        uri: 'https://reader-reader.s3.amazonaws.com/page-1.html',
        width,
        height,
    };

    return <View viewProps={viewProps} />;
}
