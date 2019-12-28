import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Drink from '../components/drink/Drink';
import Profile from '../components/profile/Profile';
import DrinkSkeleton from '../util/DrinkSkeleton';

import { connect } from 'react-redux';
import { getDrinks } from '../redux/actions/drinkActions';

import { Container, Button } from 'reactstrap';

class Home extends Component {

    componentDidMount() {
        this.props.getDrinks();
    }

    render() {

        const { drinks, loading } = this.props.data;
        let recentDrinksMarkup = !loading ? (
            drinks.map((drink) => <Drink key={drink.drinkId} drink={drink} />)
        ) : (
            <DrinkSkeleton />
        );

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
                <hr />
                <Grid container spacing={16}>
                    <Grid item sm={8} xs={12}>
                        {recentDrinksMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Profile />
                    </Grid>
                </Grid>
            </div>
        );
    }    
}

Home.propTypes = {
    getDrinks: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(
    mapStateToProps,
    { getDrinks }
)(Home);