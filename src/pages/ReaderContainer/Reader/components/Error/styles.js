import styled from 'styled-components/native';

export const Container = styled.View`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

export const Icon = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: 50px;
    height: 50px;
`;

export const Message = styled.Text`
    margin-top: 20px;
    font-size: 18px;
    font-family: 'Nunito-Regular';
    text-align: center;
`;
