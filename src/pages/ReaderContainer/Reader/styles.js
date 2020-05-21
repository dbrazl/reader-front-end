import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Book = styled.FlatList.attrs({
    showsHorizontalScrollIndicator: false,
})`
    flex: 1;
`;
