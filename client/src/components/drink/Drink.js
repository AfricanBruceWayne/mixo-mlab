import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import MyButton from '../../util/MyButton';
import DeleteDrink from './DeleteDrink';
import DrinkDialog from './DrinkDialog';
import LikeButton from './LikeButton';

// MUI Stuff
import { Card, CardContent, CardMedia, Typography, withStyles } from '@material-ui/core';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux    
import { connect } from 'react-redux';

const styles = {
    card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20
    },
    image: {
      minWidth: 200
    },
    content: {
      padding: 25,
      objectFit: 'cover'
    }
};

class Drink extends Component {

  render() {

      dayjs.extend(relativeTime);
      const {
        classes,
        drink: {
          body,
          createdAt,
          userImage,
          userHandle,
          drinkId,
          likeCount,
          commentCount
        },
        user: {
          authenticated,
          credentials: { handle }
        }
      } = this.props;
      const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteDrink drinkId={drinkId} />
      ) : null;
      return(
          <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton drinkId={drinkId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <DrinkDialog
          drinkId={drinkId}
          userHandle={userHandle}
          openDialog={this.props.openDialog}
        />
      </CardContent>
    </Card>
        );
    }
}

Drink.propTypes = {
  user: PropTypes.object.isRequired,
  drink: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Drink));
