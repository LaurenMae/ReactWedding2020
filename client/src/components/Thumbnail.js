import React from 'react';

import './thumbnail.scss';

export default function Thumbnail({ children, ...props }) {
    return (
        <div className='thumbnail-container' {...props}>
            <div className='text-container'>
                {children}
            </div>
        </div>
    )
}