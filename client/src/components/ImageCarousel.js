import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';

import './imageCarousel.scss';

export default function ImageCarousel({ images }) {
    return (
        <Carousel>
            {
                images.map(({ image, placeName }) => (
                    <CarouselItem style={{ height: '300px' }}>
                        <Carousel.Caption>
                            <h3>{placeName}</h3>
                        </Carousel.Caption>
                        <img
                            height='300px'
                            src={require(`../images/${image}`)}
                            alt={`Image cannot be shown: ${placeName}`}
                        />
                    </CarouselItem>
                ))
            }
        </Carousel>
    )
}