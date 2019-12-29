import React, { useState, Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
} from 'react-router-dom';

import '../../App.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    Collapse,
    Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink,
    UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem, 
    Container
  } from 'reactstrap';

import { connect } from 'react-redux';

// MUI stuff
import { AppBar, Toolbar, Button } from '@material-ui/core';

// Icons
import HomeIcon from '@material-ui/icons/Home';

import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostDrink from '../drink/PostDrink';
import Notifications from './Notifications';

import SignUp from '../../pages/Signup';
import Login from '../../pages/Login';
import Home from '../../pages/Home';  

class AppNavbar extends Component {
    
    render() {

        const { authenticated } = this.props;

        const [isOpen, setIsOpen] = useState(false);

        const toggle = () => setIsOpen(!isOpen);

        return (
            <Router>
            <div>
              <Navbar style={{ marginBottom: "1rem" }} light expand="md">
                <Container>
                    <NavbarBrand href="/"> 
                    Mixo
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                        <NavLink href="#">Cocktails</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="https://github.com/AfricanBruceWayne/mixo-mlab" target="_blank">GitHub</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Options
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href="/comingsoon">
                            My Cocktails
                            </DropdownItem>
                            <DropdownItem href="/comingsoon">
                            Blog
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem href="/comingsoon">
                            Contact Us
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav>
                        {authenticated ? (
                            <Fragment>
                                <PostDrink />
                                <Link to="/">
                                    <MyButton tip="Home">
                                        <HomeIcon />
                                    </MyButton>
                                </Link>
                                <Notifications />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/">
                                    Home
                                </Button>
                                <Button color="inherit" component={Link} to="/signup">
                                    Signup
                                </Button>
                            </Fragment>
                    )}
                    </Nav>
                    </Collapse>
                </Container>
              </Navbar>
            <Route render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        timeout={450}
                        classNames="fade"
                    >
                        <Switch>
                            <Route path="/comingsoon" component={ ComingSoon } />
                            <Route path="/register" component={ SignUp } />
                            <Route path="/login" component={ Login } />
                            <Route exact path="/" component={ Home } />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )} />
            </div>
            </Router>
       );
    }
}

AppNavbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

function ComingSoon() {
    return <h2 style={{ margin: "2rem", textAlign: "center" }}>Coming Soon!</h2>;
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});
  
export default connect(mapStateToProps)(AppNavbar);