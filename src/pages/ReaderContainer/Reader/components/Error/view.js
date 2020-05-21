import React from 'react';

import { Container, Icon, Message } from './styles';

const View = ({ viewProps }) => {
    const { errorMessage, icon, width, height } = viewProps;

    return (
        <Container width={width} height={height}>
            <Icon source={icon} />
            <Message>{errorMessage}</Message>
        </Container>
    );
};

export default View;
