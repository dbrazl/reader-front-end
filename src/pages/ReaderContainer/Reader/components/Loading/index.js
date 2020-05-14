import React, { useState, useEffect } from 'react';

import learning from '../../../../assets/icons/learning.png';
import paper from '../../../../assets/icons/paper.png';
import pencil from '../../../../assets/icons/pencil.png';
import protactor from '../../../../assets/icons/protactor.png';
import school from '../../../../assets/icons/school.png';

import View from './view';

const SplashArt = ({ navigation }) => {
    const [icon, setIcon] = useState();
    let count = 0,
        interval,
        timeout;

    const icons = [learning, paper, pencil, protactor, school];

    useEffect(() => {
        interval = setInterval(() => {
            setIcon(icons[count]);
            count += 1;
            if (count === 4) count = 0;
        }, 800);

        //Loading reader
        timeout = setTimeout(() => {
            navigation.navigate('Reader');
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return <View viewProps={{ icon }} />;
};

export default SplashArt;
