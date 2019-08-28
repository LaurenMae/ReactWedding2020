import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default function MyNavbar() {
    const [isOpen, setOpen] = useState(false);

    return (
      <div>
        <h1>Lauren & Jamie</h1> 
        {/* className="customfont_Prestige_Signature_Script" */}
        <h3>Saturday 27th June 2020</h3>
        <Navbar light expand="lg">
          <NavbarToggler onClick={() => { setOpen(!isOpen); }} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/" onClick={() => { setOpen(!isOpen); }}>Home <span className="sr-only">(current)</span></Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/OrderofService" onClick={() => { setOpen(!isOpen); }}>Order of Service</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/Details" onClick={() => { setOpen(!isOpen); }}>Where to Stay</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/BridalParty" onClick={() => { setOpen(!isOpen); }}>Meet the Bridal Party</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/Gifts" onClick={() => { setOpen(!isOpen); }}>Gift List</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/RSVP" onClick={() => { setOpen(!isOpen); }}>RSVP</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }







