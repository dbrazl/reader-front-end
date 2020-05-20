import React from 'react';

import { WebView } from 'react-native-webview';
import { Container, Button, TextButton } from './styles';

import Loading from './components/Loading';

const View = ({ viewProps }) => {
    const { uri, width, height, loading, onLoad } = viewProps;

    return (
        <Container>
            {!loading && <Loading width={width} height={height} />}
            <WebView
                source={{ uri }}
                style={{ width, height }}
                onLoad={onLoad}
            />
        </Container>
    );
};

export default View;
