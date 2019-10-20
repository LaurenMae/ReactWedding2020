import React from 'react';
import { Container } from 'reactstrap';

import './thumbnail.scss';

export default function Thumbnail({ children, ...props }) {
    return (
        <Container className='thumbnail-container' {...props}>
            <div className='text-container'>
                {children}
            </div>
        </Container>
    )
}