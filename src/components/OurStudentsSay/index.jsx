import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { testimonials } from '../../Helper.jsx';

const TestimonialItem = ({ name, profession, testimonial, imageSrc }) => {
    return (
        <div className="testimonial-item text-center">
            <Grid container>
                <Grid item xs={12}>
                    <img className="border rounded-circle p-2 mx-auto mb-3" src={imageSrc} style={{ width: '80px', height: '80px' }} alt={name} />
                    <Typography variant="h5" className="mb-0">{name}</Typography>
                    <Typography variant="subtitle1">{profession}</Typography>
                    <div className="testimonial-text bg-light text-center p-4">
                        <Typography variant="body1" className="mb-0">{testimonial}</Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

const OurStudentsSay = () => {

    const settingsDesktop = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <ChevronRightIcon />,
        prevArrow: <ChevronLeftIcon />,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    const settingsMobile = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <ChevronRightIcon />,
        prevArrow: <ChevronLeftIcon />,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    return (
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="text-center">
                    <Typography variant="h6" className="section-title bg-white text-center text-primary px-3">Testimonial</Typography>
                    <Typography variant="h3" className="mb-5">Our Students Say!</Typography>
                </div>
                <div className="d-none d-md-block"> {/* Show only on desktop */}
                    <Slider {...settingsDesktop}>
                        {testimonials.map(testimonial => (
                            <TestimonialItem
                                key={testimonial.id}
                                name={testimonial.name}
                                profession={testimonial.profession}
                                testimonial={testimonial.testimonial}
                                imageSrc={testimonial.imageSrc}
                            />
                        ))}
                    </Slider>
                </div>
                <div className="d-md-none"> {/* Show only on mobile */}
                    <Slider {...settingsMobile}>
                        {testimonials.map(testimonial => (
                            <TestimonialItem
                                key={testimonial.id}
                                name={testimonial.name}
                                profession={testimonial.profession}
                                testimonial={testimonial.testimonial}
                                imageSrc={testimonial.imageSrc}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default OurStudentsSay;
