import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import server from '../../../../../assets/icons/errors/png/server.png';
import badRequest from '../../../../../assets/icons/errors/png/badRequest.png';
import unauthorized from '../../../../../assets/icons/errors/png/unauthorized.png';
import notFound from '../../../../../assets/icons/errors/png/notFound.png';
import timeout from '../../../../../assets/icons/errors/png/timeout.png';
import api from '../../../../../assets/icons/errors/png/api.png';

import View from './view';

const Index = ({ width, height }) => {
    const [icon, setIcon] = useState(api);

    const { errorMessage } = useSelector(state => state.reader.status);
    const { http } = useSelector(state => state.log.report);

    const icons = [server, badRequest, unauthorized, notFound, timeout, api];

    useEffect(() => {
        const selected = icons[selectIcon()];
        setIcon(selected);
    }, [http]);

    function selectIcon() {
        if (http === 500) return 0;
        if (http === 400) return 1;
        if (http === 401) return 2;
        if (http === 404) return 3;
        if (http === 408) return 4;
        return 5;
    }

    const viewProps = {
        width,
        height,
        errorMessage,
        icon,
    };

    return <View viewProps={viewProps} />;
};

export default Index;
