import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarStyle from "./navbar.module.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import AuthService from './../services/authService';

const NavBar = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownActiveKey, setActiveKey] = useState(1);
  // const { user: currentUserD } = useSelector((state) => state.auth);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const now = new Date();
    if (loggedInUser) {
      if (loggedInUser.expiry && Math.abs(loggedInUser.expiry - now) > 30) {
        setUserName(loggedInUser.user.fullName);
        setCurrentUser(true);
      } else {
        setUserName(loggedInUser.user.fullName);
        setCurrentUser(true);
      }
    } else {
      return null;
    }
  }, []);

  const handleSelect = (key) => {
    setActiveKey(Math.trunc(key));
  };

  const handleLogout = async () => {
    setCurrentUser(false);
    await AuthService.signOut();
    history.push("/signin");
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <Navbar
          className={NavBarStyle.navContainer}
          expand="lg"
        >
          <Navbar.Brand className={NavBarStyle.navBrandLink}>
            JSCentric
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link
                exact
                as={NavLink}
                to="/home"
                className={NavBarStyle.navLink}
                activeClassName={NavBarStyle.activeNavLink}
              >
                Home
              </Nav.Link>
              <Nav.Link
                exact
                as={NavLink}
                to="/jobs"
                className={NavBarStyle.navLink}
                activeClassName={NavBarStyle.activeNavLink}
              >
                Jobs
              </Nav.Link>
              <Nav.Link
                exact
                as={NavLink}
                to="/contactus"
                className={NavBarStyle.navLink}
                activeClassName={NavBarStyle.activeNavLink}
              >
                Contact Us
              </Nav.Link>
              <Nav.Link
                exact
                as={NavLink}
                to="/aboutus"
                className={NavBarStyle.navLink}
                activeClassName={NavBarStyle.activeNavLink}
              >
                About Us
              </Nav.Link>
            </Nav>
            {currentUser ? (
              <Nav
                className="ms-auto"
                activeKey={dropdownActiveKey}
                onSelect={handleSelect}
              >
                <NavDropdown
                  alignLeft
                  flip
                  title={
                    <span className={NavBarStyle.navLink}>{userName}</span>
                  }
                  id="basic-nav-dropdown"
                  className={NavBarStyle.navDropdownLink}
                  eventKey={3}
                >
                  <NavDropdown.Item
                    exact
                    as={NavLink}
                    to="/createpost"
                    eventKey={3.1}
                  >
                    Create Post
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    exact
                    as={NavLink}
                    to="/dashboard"
                    eventKey={3.1}
                  >
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    exact
                    as={NavLink}
                    to="/readinglist"
                    eventKey={3.2}
                  >
                    Readling List
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    exact
                    as={NavLink}
                    to="/account"
                    eventKey={3.3}
                  >
                    Account
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    exact
                    as={NavLink}
                    to="/settings"
                    eventKey={3.4}
                  >
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : null}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};
export default NavBar;
