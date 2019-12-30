import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

import navbarEntries from './navPages';
import './navbar.scss';

export default function MyNavbar() {
    const [isOpen, setOpen] = useState(false);

    const active = (path) => {
      return window.location.pathname.includes(path);
    }

    return (
      <div className='navbar-container'>
        <h1>Lauren & Jamie</h1>
        <div>27th June 2020 at 1.30pm</div>
        <Navbar light expand="lg">
          <NavbarToggler onClick={() => { setOpen(!isOpen); }} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {
                Object.keys(navbarEntries).map((key, index) => (
                  <NavItem key={index}>
                    <Link data-id={navbarEntries[key]}
                      className={classnames({
                        "nav-link": true,
                        "active": active(`/${navbarEntries[key]}`)
                      })}
                      to={`/${navbarEntries[key]}`}
                      onClick={() => { setOpen(!isOpen); }}>
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
