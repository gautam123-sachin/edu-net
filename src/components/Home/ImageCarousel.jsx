import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMediaQuery } from '@react-hook/media-query';

const ExampleCarouselImage = ({ src, alt }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    return (
        <img
            className="d-block w-100"
            src={src}
            alt={alt}
            height={isMobile ? 400 : 600}
        />
    );
};

const ImageCarousel = () => {
    const carouselItems = [
        { src: 'Courses.png', alt: 'Learning with Earning 1', caption: 'Online Courses', captionText: 'Learn new skills and earn certifications through online courses.' },
        { src: 'Freelancer.png', alt: 'Learning with Earning 2', caption: 'Freelancing', captionText: 'Work as a freelancer and earn while learning new skills.' },
        { src: 'Invest.png', alt: 'Learning with Earning 3', caption: 'Investment', captionText: 'Invest in education and training to increase earning potential.' }
    ];

    return (
        <Carousel>
            {carouselItems.map((item, index) => (
                <Carousel.Item key={index} interval={1000}>
                    <ExampleCarouselImage src={item.src} alt={item.alt} />
                    <Carousel.Caption>
                        <h3>{item.caption}</h3>
                        <p>{item.captionText}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
