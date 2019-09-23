
import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import Countdown from '../components/Countdown';

export default function ImageCarousel() {
    return (
        <Carousel>
            {/* <CarouselItem> */}
                {/* <img
                    className="d-block w-100"
                    src={require(`../images/kathryn.jpg`)}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
                {/* <Countdown className="d-block w-100" title='COUNT DOWN TO THE BIG DAY' dateTo='June 27, 2020 13:30:00 GMT+01:00' mostSignificantFigure="day"/>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            {/* </CarouselItem> */}
            <CarouselItem style={{ height: '300px' }}>
                <img
                    height='300px'
                    src={require('../images/hensol2.jpg')}
                    alt="Second slide"
                />
            </CarouselItem>
            <CarouselItem style={{ height: '300px' }}>
                <img
                    height='300px'
                    src={require('../images/hensol3.jpg')}
                    alt="Second slide"
                />
            </CarouselItem>
            <CarouselItem style={{ height: '300px' }}>
                <img
                    height='300px'
                    src={require('../images/hensol4.jpg')}
                    alt="Second slide"
                />
            </CarouselItem>
            {/* <CarouselItem> */}
                 
                 {/* <Countdown title='COUNT DOWN TO THE BIG DAY' dateTo='June 27, 2020 13:30:00 GMT+01:00' mostSignificantFigure="day"/> */}
                {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>  */}
             {/* </CarouselItem> */}
        </Carousel>
    )
}