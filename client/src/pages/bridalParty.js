import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'reactstrap';
import BridalPartyList from '../contexts/BridalParty.json';
import groupBy from 'lodash/groupBy';
import startCase from 'lodash/startCase';
import ImageThumbnail from '../components/ImageThumbnail';

import './bridalParty.scss';

export default function BridalParty() {
    const [partyByRole, setPartyByRole ] = useState({});

    useEffect(() => {
        setPartyByRole(groupBy(BridalPartyList, 'role'));
    }, []);

    return (
        <Container data-id='bridalParty-page'>
        {
            Object.keys(partyByRole).map(partyRole => (
                <Container key={partyRole}>
                    <h3 className='partyRole'>{startCase(partyRole)}</h3>
                    <Row data-id={partyRole}>
                        {
                            BridalPartyList.map(({name, role, relation, image}, key) => {
                                return role === partyRole &&
                                <Col key={key} xs={12} sm={6} md={3} lg={3} className="partyMember">
                                    <ImageThumbnail image={image}>
                                        <h4>{name}</h4>
                                        <p>{relation}</p>
                                    </ImageThumbnail>
                                </Col>
                            })
                        }
                    </Row>
                </Container>
            ))
        }
        </Container>
    );
}

