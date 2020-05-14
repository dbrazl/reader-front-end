import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: 80px;
    height: 80px;
`;
