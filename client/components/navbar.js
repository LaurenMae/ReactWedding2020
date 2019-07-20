import React from 'react';
import { navigate } from '@reach/router';

export default function Navbar() {
    function handleNavigation(route) {
        navigate(route);
    }

    return (
        <div>
            <h2>Lauren & Jamie</h2>
            <h3>27th June 2020</h3>
            <div className="nav-container">
                <div className="table">
                    <ul id="horizontal-list">
                        <li onClick={() => handleNavigation("BridalParty")}>Bridal Party</li>
                        <li onClick={() => handleNavigation("Details")}>Details</li>
                        <li onClick={() => handleNavigation("Gifts")}>Gifts</li>
                        <li onClick={() => handleNavigation("Menu")}>Menu</li>
                        <li onClick={() => handleNavigation("OrderofService")}>Order of Service</li>
                        <li onClick={() => handleNavigation("RSVP")}>RSVP</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}