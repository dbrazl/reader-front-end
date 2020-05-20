import React from 'react';

import { Container, Icon } from './styles';

const View = ({ viewProps }) => {
    const { icon, width, height } = viewProps;

    return (
        <Container width={width} height={height}>
            <Icon source={icon} />
        </Container>
    );
};

export default View;
