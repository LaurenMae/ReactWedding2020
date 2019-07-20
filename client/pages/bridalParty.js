import React from 'react';
import Navbar from '../components/navbar';

import BridalPartyList from '../contexts/BridalParty.json';
import { BlurbContext } from '../Context';

import Blurb from '../components/blurb';

export default function BridalParty() {
    return (
        <div>
            <Navbar />
            <div className="side-by-side-wrapper container">
                <div className="left-col">
                    {
                        BridalPartyList.Bride.map((partyMember, key) => {
                            return (
                                <BlurbContext.Provider value={partyMember} key={key}>
                                    <Blurb />
                                </BlurbContext.Provider>
                            );
                        })
                    }
                </div>
                <div className="right-col">
                    {
                        BridalPartyList.Groom.map((partyMember, key) => {
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

