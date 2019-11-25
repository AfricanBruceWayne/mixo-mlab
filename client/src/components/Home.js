import React from 'react';

import { Jumbotron, Button } from 'reactstrap';

import AppNavbar from './AppNavbar';

export default function Home() {

    return(
        <div>
            <AppNavbar />
            <Jumbotron>
                <h1 className="display-3">Welcome To Mixo!</h1>
                <p className="lead">
                    The ultimate mixology cocktail app
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
        </div>
    );
}