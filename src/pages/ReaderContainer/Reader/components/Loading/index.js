import React, { useState, useEffect } from 'react';

import learning from '../../../../../assets/icons/learning.png';
import paper from '../../../../../assets/icons/paper.png';
import pencil from '../../../../../assets/icons/pencil.png';
import protactor from '../../../../../assets/icons/protactor.png';
import school from '../../../../../assets/icons/school.png';

import View from './view';

const Index = ({ width, height }) => {
    const [icon, setIcon] = useState();
    let count = 0,
        interval;

    const icons = [learning, paper, pencil, protactor, school];

    function selecIcon() {
        setIcon(icons[count]);
        count += 1;
        if (count === 4) count = 0;
    }

    useEffect(() => {
        interval = setInterval(selecIcon, 500);

        return () => clearInterval(interval);
    }, []);

    const viewProps = {
        icon,
        width,
        height,
    };

    return <View viewProps={viewProps} />;
};

export default Index;
