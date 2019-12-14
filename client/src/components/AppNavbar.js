import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import '../App.css';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
  } from 'reactstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SignUp from './auth/Signup';
import Login from './auth/Login';
import Home from './Home';  

  export default function AppNavbar() {
    
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    
    AppNavbar.propTypes = {
        auth: PropTypes.object.isRequired
    };

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
                    <NavItem>
                        <NavLink href="/register">
                            Sign-Up
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/login">
                            Login
                        </NavLink>
                    </NavItem>
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

function ComingSoon() {
    return <h2 style={{ margin: "2rem", textAlign: "center" }}>Coming Soon!</h2>;
}