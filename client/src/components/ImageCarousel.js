import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';

import './imageCarousel.scss';

export default function ImageCarousel({ images }) {
    return (
        <Carousel interval={2000}>
            {
                images.map(({ image, placeName }, index) => (
                    <CarouselItem style={{ width: '100%' }} key={index}>
                        <Carousel.Caption>
                            <h4>{placeName}</h4>
                        </Carousel.Caption>
                        <img
                            width='100%'
                            src={require(`../images/${image}`)}
                            alt={placeName}
                        />
                    </CarouselItem>
                ))
            }
        </Carousel>
    )
}