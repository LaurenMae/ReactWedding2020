import React from 'react';
import { Container } from 'reactstrap';

import './thumbnail.scss';

export default function Thumbnail({ children }) {
    return (
        <Container className='thumbnail-container'>
            <div className='text-container'>
                {children}
            </div>
        </Container>
    )
}