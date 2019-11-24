import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import SignUp from './components/auth/Signup';
import Login from './components/auth/Login';


function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/register">Sign-Up</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/register">
                        <SignUp />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>

            </div>
        </Router>
    );
}

function Home() {
    return <h2>Welcome To Mixo</h2>;
}

export default App;