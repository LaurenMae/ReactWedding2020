import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import BridalPartyList from '../contexts/BridalParty.json';
import './bridalParty.scss';

export default function BridalParty() {
    return (
        <Container>
            <h3>Bridesmaids</h3>
            <Row>
                 {/* className="blurb_container" style={{border: "1px solid black"}}> */}
                {
                    BridalPartyList.bridesmaids.map(({name, relation, image}, key) => (
                        <Col key={key} xs={12} sm md lg className="partyMember">
                            {/* <img src={require(`../images/${image}`)} alt={name} /> */}
                            <h4>{name}</h4>
                            <div>{relation}</div>
                        </Col>
                    ))
                }
            </Row>

            <h3>Groomsmen</h3>
            <Row>
                 {/* className="blurb_container" style={{border: "1px solid black"}}> */}
                {
                    BridalPartyList.groomsmen.map(({name, relation, image}, key) => (
                        <Col key={key} xs={12} sm md lg className="partyMember">
                            {/* <img src={require(`../images/${image}`)} alt={name} /> */}
                            <h4>{name}</h4>
                            <div>{relation}</div>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}

