import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

export const Icon = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: 80px;
    height: 80px;
`;
