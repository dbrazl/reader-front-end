import React from 'react';

import { Container, Button, TextButton } from './styles';

const SplashArt = ({ navigation }) => {
  return (
    <Container>
        <Button onPress={() => navigation.navigate('Reader')}>
            <TextButton>Splash Art</TextButton>
        </Button>
    </Container>
  );
}

export default SplashArt;
