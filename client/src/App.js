import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// Redux
import store from './redux/store';
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUser } from './redux/actions/userActions';

// Components
import AppNavbar from './components/layout/AppNavbar';
import themeObject from './util/theme';
import AuthRoute from './util/AuthRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';

import axios from 'axios';

const theme = createMuiTheme(themeObject);

class App extends Component {
    
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <AppNavbar />
                        <div className="container">
                            <Switch>
                            <Route exact path="/" component={Home} />
                                <AuthRoute exact path="/login" component={Login} />
                                <AuthRoute exact path="/signup" component={Signup} />
                                <Route exact path="/users/:handle" component={User} />
                                <Route
                                exact
                                path="/users/:handle/drink/:drinkId"
                                component={User}
                                />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}


export default App;