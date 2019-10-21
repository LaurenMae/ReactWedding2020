import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import BridalPartyList from '../contexts/BridalParty.json';
import ImageThumbnail from '../components/ImageThumbnail';

import './bridalParty.scss';

export default function BridalParty() {
    return (
        <Container data-id='bridalParty-page' className='bridalParty-page'>
        {
            <Container>
                <Row>
                    {
                        BridalPartyList.map(({name, role, relation, image}, key) => (
                            <Col key={key} xs={12} sm={6} md={3} lg={3} className="partyMember">
                                <ImageThumbnail image={image}>
                                    <h3>{name}</h3>
                                    <p>{role}</p>
                                    <p>{relation}</p>
                                </ImageThumbnail>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        }
        </Container>
    );
}

