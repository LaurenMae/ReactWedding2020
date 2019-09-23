import React from 'react';
import { Container } from 'reactstrap';
import { Image } from 'react-bootstrap';

import './imageThumbnail.scss';

export default function ImageThumbnail({ image, children }) {
    return (
        <Container className='image-thumbnail-container'>
            <div className='image-container'>
                <Image src={require(`../images/${image}`)} rounded />
            </div>
            <div className='text-container'>
                {children}
            </div>
        </Container>
    )
}