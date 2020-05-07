import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import SplashArt from '../pages/ReaderContainer/SplashArt';
import Reader from '../pages/ReaderContainer/Reader';

import { transition } from './transitions';

navigation = () =>
    createAnimatedSwitchNavigator(
        {
            SplashArt,
            Reader,
        },
        {
            transition: transition(),
        }
    );

export default () => createAppContainer(navigation());
