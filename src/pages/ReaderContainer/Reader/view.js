import React from 'react';

import { WebView } from 'react-native-webview';
import { Container, Button, TextButton } from './styles';

import Loading from './components/Loading';
import Error from './components/Error';

const View = ({ viewProps }) => {
    const { html, dimensions, status } = viewProps;

    const { width, height } = dimensions;
    const { errorStatus, loading, onLoad } = status;
    const { error, errorMessage } = errorStatus;

    return (
        <Container>
            {!loading && <Loading width={width} height={height} />}
            {error && (
                <Error
                    errorMessage={errorMessage}
                    width={width}
                    height={height}
                />
            )}
            <WebView
                source={{ html }}
                style={{ width, height }}
                onLoad={onLoad}
            />
        </Container>
    );
};

export default View;
