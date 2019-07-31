import React from 'react';
import { navigate } from '@reach/router';

export default function Navbar() {
    return (
      <>
          <h1>Lauren & Jamie</h1> 
          {/* className="customfont_Prestige_Signature_Script" */}
          <h2>27th June 2020</h2>
          <nav className="navbar navbar-expand-lg navbar-light" style={{display: 'inline-block'}}>
            <div style={{display: 'inline-block'}}>
              <a className="navbar-brand"></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/OrderofService">Order of Service</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/Details">Where to Stay</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/BridalParty">Meet the Bridal Party</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/Gifts">Gift List</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/RSVP">RSVP</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
      </>
    );
}