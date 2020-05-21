import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dimensions } from 'react-native';
import View from './view';

import {
    openReaderRequest,
    getPageRequest,
} from '../../../store/modules/reader/actions';

const Index = () => {
    const [width, setWidth] = useState(Dimensions.get('window').width);
    const [height, setHeight] = useState(Dimensions.get('window').height);
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState({});
    const [publicationId, setPublicationId] = useState(null);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);

    const flatlistRef = useRef();

    const pagesState = useSelector(state => state.reader.content.pages);
    const { error, errorMessage, success } = useSelector(
        state => state.reader.status
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const id = 1,
            initialPage = 0;

        setPage(initialPage);
        setPublicationId(id);

        Dimensions.addEventListener('change', orientationChange);

        dispatch(openReaderRequest(id, initialPage));

        return () => {
            Dimensions.removeEventListener('change');
        };
    }, []);

    useEffect(
        () =>
            setErrorStatus({
                error,
                errorMessage,
            }),
        [error, errorMessage]
    );

    useEffect(() => {
        setPages(pagesState);
    }, [pagesState]);

    useEffect(() => {
        if (publicationId) dispatch(getPageRequest(page));
    }, [page]);

    function orientationChange(event) {
        const { width, height } = event.screen;
        setWidth(width);
        setHeight(height);
    }

    function onLoad() {
        setLoading(false);
    }

    function changePage(event) {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;

        const { width } = layoutMeasurement;
        const position = contentOffset.x;

        let nextPage = page;

        if (position > width * page + width / 3) nextPage++;
        if (position < width * page - width / 3) nextPage--;

        if (nextPage !== page) {
            flatlistRef.current.scrollToIndex({ index: nextPage });
            setPage(nextPage);
        } else flatlistRef.current.scrollToIndex({ index: page });
    }

    const viewProps = {
        pages,
        dimensions: {
            width,
            height,
        },
        status: {
            success,
            loading,
            errorStatus,
            loading,
            onLoad,
        },
        flatlistRef,
        changePage,
    };

    return <View viewProps={viewProps} />;
};

export default Index;
