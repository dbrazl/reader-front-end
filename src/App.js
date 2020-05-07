import React from 'react';

import createRouter from './Routes/routes';

export default function App() {
    const Routes = createRouter();

    return <Routes />;
}
