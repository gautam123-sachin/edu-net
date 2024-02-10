import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = () => {
    const slides = [
        {
            image: 'https://via.placeholder.com/800x400',
            title: 'First Slide Label',
            caption: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        },
        {
            image: 'https://via.placeholder.com/800x400',
            title: 'Second Slide Label',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            image: 'https://via.placeholder.com/800x400',
            title: 'Third Slide Label',
            caption: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        }
    ];

    return (
        <Carousel>
            {slides.map((slide, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                    />
                    <Carousel.Caption>
                        <h3>{slide.title}</h3>
                        <p>{slide.caption}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ImageCarousel;
