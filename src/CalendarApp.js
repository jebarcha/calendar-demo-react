import React from 'react';

import { Provider } from 'react-redux';

import { store } from './components/store/store';
import { AppRouter } from './router/AppRouter';

export const CalendarApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
