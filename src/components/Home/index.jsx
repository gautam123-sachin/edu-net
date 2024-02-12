import React from 'react';
import ImageCarousel from './ImageCarousel.jsx';
import WelcomeToElearning from '../WelcomeToElearning/index.jsx';
import CoursesCategories from '../CoursesCategories/index.jsx';
import PopularCourses from '../PopularCourses/index.jsx';
import ExpertInstructors from '../ExpertInstructors/index.jsx';
import OurStudentsSay from '../OurStudentsSay/index.jsx';
import SkilledInstructorsSection from '../SkilledInstructorsSection/index.jsx';

const Home = () => {

    return (
        <>
            <ImageCarousel />
            <SkilledInstructorsSection />
            <WelcomeToElearning />
            <CoursesCategories />
            <PopularCourses />
            <ExpertInstructors />
            <OurStudentsSay />
        </>
    );
}
export default Home;