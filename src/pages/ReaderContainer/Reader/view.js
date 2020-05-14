import React from 'react';

import { WebView } from 'react-native-webview';
import { Container, Button, TextButton } from './styles';

const View = ({ viewProps }) => {
    const { navigation, uri, width, height } = viewProps;

    return (
        <Container>
            <WebView source={{ uri }} style={{ width, height }} />
        </Container>
    );
};

export default View;
