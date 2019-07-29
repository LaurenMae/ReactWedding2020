import React from 'react';
import MyNavbar from '../components/navbar';

import BridalPartyList from '../contexts/BridalParty.json';
import { BlurbContext } from '../Context';

import Blurb from '../components/blurb';

export default function BridalParty() {
    return (
        <div>
            <MyNavbar />
            <div className="side-by-side-wrapper container">
                <div style={{textAlign: 'center', width: '100%', display: 'table'}}>
                    {
                        BridalPartyList.BridalParty.map((partyMember, key) => {
                            return (
                                <BlurbContext.Provider value={partyMember} key={key}>
                                    <Blurb />
                                </BlurbContext.Provider>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

