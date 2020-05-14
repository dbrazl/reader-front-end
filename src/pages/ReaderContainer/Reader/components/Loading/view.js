import React from 'react';

import { Container, Icon } from './styles';

const SplashArt = ({ viewProps }) => {
    const { icon } = viewProps;

    return (
        <Container>
            <Icon source={icon} />
        </Container>
    );
};

export default SplashArt;
