import React from 'react';
import { Transition } from 'react-native-reanimated';

export function transition() {
    return (
        <Transition.Together>
            <Transition.Out
                type="slide-top"
                durationMs={400}
                interpolation="easeIn"
            />
            <Transition.In
                type="slide-bottom"
                durationMs={400}
            />
        </Transition.Together>
    );
}
