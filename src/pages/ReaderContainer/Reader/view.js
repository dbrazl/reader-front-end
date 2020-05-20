import React from 'react';

import { WebView } from 'react-native-webview';
import { Container, Button, TextButton } from './styles';

import Loading from './components/Loading';

const View = ({ viewProps }) => {
    const { html, width, height, loading, onLoad } = viewProps;

    return (
        <Container>
            {!loading && <Loading width={width} height={height} />}
            <WebView
                source={{ html }}
                style={{ width, height }}
                onLoad={onLoad}
            />
        </Container>
    );
};

export default View;
