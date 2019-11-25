import React from 'react';

import { Container, Button } from 'reactstrap';

export default function Home() {

    return(
        <div>
            <Container>
                    <h1 className="display-3">Welcome To Mixo!</h1>
                    <p className="lead">
                        The ultimate mixology cocktail app
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
            </Container>
        </div>
    );
}