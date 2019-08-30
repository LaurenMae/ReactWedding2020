import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from 'reactstrap';

import { navbarEntries } from './navPages.json';

export default function MyNavbar() {
    const [isOpen, setOpen] = useState(false);

    return (
      <div>
        <h1>Lauren & Jamie</h1>
        <h3>Saturday 27th June 2020</h3>
        <Navbar light expand="lg">
          <NavbarToggler onClick={() => { setOpen(!isOpen); }} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {
                Object.keys(navbarEntries).map((key, index) => (
                  <NavItem key={index}>
                    <Link className="nav-link" to={navbarEntries[key]} onClick={() => { setOpen(!isOpen); }}>
                      {key} <span className="sr-only">(current)</span>
                    </Link>
                  </NavItem>
                ))
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
