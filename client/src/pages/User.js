import React, { Component } from 'react';

import PropTypes from 'prop-types';

import axios from 'axios';

import Drink from '../components/drink/Drink';
import StaticProfile from '../components/profile/StaticProfile';

import Grid from '@material-ui/core/Grid';

import DrinkSkeleton from '../util/DrinkSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/drinkActions';

class User extends Component {
  
    state = {
        profile: null,
        drinkIdParam: null
    };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const drinkId = this.props.match.params.drinkId;

    if (drinkId) this.setState({ drinkIdParam: drinkId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { drinks, loading } = this.props.data;
    const { drinkIdParam } = this.state;

    const drinksMarkup = loading ? (
      <DrinkSkeleton />
    ) : drinks === null ? (
      <p>No drinks from this user</p>
    ) : !drinkIdParam ? (
      drinks.map((drink) => <Drink key={drink.drinkId} drink={drink} />)
    ) : (
      drinks.map((drink) => {
        if (drink.drinkId !== drinkIdParam)
          return <Drink key={drink.drinkId} drink={drink} />;
        else return <Drink key={drink.drinkId} drink={drink} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {drinksMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(User);