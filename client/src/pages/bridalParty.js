import React from 'react';
import BridalPartyList from '../contexts/BridalParty.json';
import './bridalParty.scss';

export default function BridalParty() {
    return (
        <div className="blurb_container">
            {
                BridalPartyList.BridalParty.map(({name, role, relation, image}, key) => (
                    <div className="partyMember" key={key}>
                        <img src={require(`../images/${image}`)} alt={name} />
                        <div>
                            <h3>{name}</h3>
                            <h4>{role}</h4>
                            <div>{relation}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

