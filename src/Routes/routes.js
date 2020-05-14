import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import Reader from '../pages/ReaderContainer/Reader';

import { transition } from './transitions';

navigation = () =>
    createAnimatedSwitchNavigator(
        {
            Reader,
        },
        {
            transition: transition(),
        }
    );

export default () => createAppContainer(navigation());
