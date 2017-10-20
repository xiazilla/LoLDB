import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from "../images/logo.png";

export default class LoLNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="NavBar">
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">
          <img src={logo}/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              	<NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Champions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Items</NavLink>
              </NavItem>
              <NavItem>
              	<NavLink href="/">Matches</NavLink>
              </NavItem>
              <NavItem>
              	<NavLink href="/">Game Modes</NavLink>
              </NavItem>
              <NavItem>
              	<NavLink href="/">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
