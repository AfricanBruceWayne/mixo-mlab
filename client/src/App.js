import React from 'react'
import store from './store';
import { Provider } from 'react-redux';

import AppNavbar from './components/AppNavbar';

function App() {
    return (
        <Provider store={store}>
            <div>
                <AppNavbar />
            </div>
        </Provider>
    );
}


export default App;