import React from 'react';

import { Container, Button, TextButton } from './styles';

export default function SignIn({ navigation }) {
    return (
        <Container>
            <Button onPress={() => navigation.navigate('SplashArt')}>
                <TextButton>Reader</TextButton>
            </Button>
        </Container>
      );
}
