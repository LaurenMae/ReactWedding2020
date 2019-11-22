import React from 'react';
import { Col, Row } from 'reactstrap';
import BridalPartyList from '../contexts/BridalParty.json';
import ImageThumbnail from '../components/ImageThumbnail';
import styled from 'styled-components';

const Page = styled.div`
    text-align: center;
    margin: 0 5%;
    width: 90%;
`;

export default function BridalParty() {
    return (
        <Page data-id='bridalParty-page' className='bridalParty-page'>
        {
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
        }
        </Page>
    );
}

