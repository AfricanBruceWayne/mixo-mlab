import React, { Component } from 'react';

import MyButton from '../../util/MyButton';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { likeDrink, unlikeDrink } from '../../redux/actions/drinkActions';

export class LikeButton extends Component {
  
  likedDrink = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.drinkId === this.props.drinkId
      )
    )
      return true;
    else return false;
  };

  likeDrink = () => {
    this.props.likeDrink(this.props.drinkId);
  };

  unlikeDrink = () => {
    this.props.unlikeDrink(this.props.drinkId);
  };

  render() {
    
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedDrink() ? (
      <MyButton tip="Undo like" onClick={this.unlikeDrink}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeDrink}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  drinkId: PropTypes.string.isRequired,
  likeDrink: PropTypes.func.isRequired,
  unlikeDrink: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeDrink,
  unlikeDrink
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);