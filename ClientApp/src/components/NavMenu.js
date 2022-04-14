import React, { Component, useContext } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useState } from 'react';
import { AuthContext } from '../context';



const NavMenu = (props) => {

  const [collapsed, setCollapsed] = useState(false);
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  }
  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img width={250} src="img/wh-logo.svg" alt="Home" />
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>


            {isAuth ? (
              <ul className="navbar-nav flex-grow">
                <NavLink tag={Link} className="" to="/items">My Items</NavLink>
                <NavLink
                  onClick={() => setIsAuth(false)}
                  // tag={Link}
                  className="btn"
                // to="/login"
                >Log Out</NavLink>
              </ul>
            )
              : (
                <ul className="navbar-nav flex-grow">
                  <NavLink
                    onClick={() => setIsAuth(true)}
                    // tag={Link}
                    className="btn"
                  // to="/login"
                  >Log In</NavLink>
                </ul>
              )
            }

          </Collapse>
        </Container>
      </Navbar>
    </header >
  )
}

export default NavMenu;