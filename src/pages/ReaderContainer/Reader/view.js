import React, { useRef, useEffect } from 'react';

import { WebView } from 'react-native-webview';
import { Container, Book } from './styles';

import Loading from './components/Loading';
import Error from './components/Error';

const View = ({ viewProps }) => {
    const { pages, dimensions, status, changePage, flatlistRef } = viewProps;

    const { width, height } = dimensions;
    const { errorStatus, loading, onLoad, success } = status;
    const { error, errorMessage } = errorStatus;

    const htmlFail = error && !success;

    function renderWebView(item) {
        return (
            <WebView
                source={{ html: item.html }}
                style={{ width, height }}
                onLoad={onLoad}
            />
        );
    }

    return (
        <Container>
            {loading && <Loading width={width} height={height} />}
            {htmlFail && (
                <Error
                    errorMessage={errorMessage}
                    width={width}
                    height={height}
                />
            )}
            <Book
                data={pages}
                ref={flatlistRef}
                keyExtractor={item => `${item}`}
                renderItem={({ item }) => renderWebView(item)}
                onScrollEndDrag={changePage}
                directionalLockEnabled
                // scrollEnabled={false}
                horizontal
            />
        </Container>
    );
};

export default View;
