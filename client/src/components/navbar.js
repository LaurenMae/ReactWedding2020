import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

import navbarEntries from './navPages';
import './navbar.scss';

export default function MyNavbar() {
    const [isOpen, setOpen] = useState(false);

    const active = (path) => {
      console.log(window.location.pathname, path);
      return window.location.pathname.includes(path);
    }

    return (
      <Container className='navbar-container'>
        {/* <div style={{ position: 'relative' }}> */}
          <h1>Lauren & Jamie</h1>
          {/* <p style={{ position: 'absolute', top: '70%', right: '30%', fontSize: '12px' }}>Saturday 27th June 2020</p> */}
        {/* </div> */}
        
        {/* <h2>Saturday 27th June 2020</h2> */}
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
      </Container>
    );
  }
