import React from 'react';
import MyNavbar from '../components/navbar';
import BridalPartyList from '../contexts/BridalParty.json';
import './bridalParty.scss';

export default function BridalParty() {
    return (
        <div>
            <MyNavbar />
            <div className="blurb_container">
                {
                    BridalPartyList.BridalParty.map(({name, role, relation, image}, key) => (
                        <div style={{display: 'inline-block', margin: '2vw'}} key={key}>
                            <img src={require(`../images/${image}`)} alt={name} />
                            <div>
                                <h3>{name}</h3>
                                <h4>{role}</h4>
                                {relation}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

