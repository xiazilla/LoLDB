import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from "../images/logo.png";
import './Search.css'

export default class LoLNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      searchValue: ''
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateSearch(event) {
    this.setState({searchValue: event.target.value});
  }

  render() {
    return (
      <div className="NavBar">
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">
          <img src={logo} alt=""/>
          </NavbarBrand>
          <div className="wrapper">
            <form action={`/searchResult=${this.state.searchValue}`}>
              <input type="text" className="input1" placeholder="Search..." value={this.state.searchValue} 
                onChange={this.updateSearch.bind(this)}/>
              <button className="btn1">GO</button>
              </form>
          </div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              	<NavLink href="/home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/champions">Champions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/items">Items</NavLink>
              </NavItem>
              <NavItem>
              	<NavLink href="/matches">Matches</NavLink>
              </NavItem>
              <NavItem>
              	<NavLink href="/maps">Maps</NavLink>
              </NavItem>
              <NavItem>
              	<NavLink href="/about">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
