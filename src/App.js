import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx'; // Add this import
import Home from './components/Home/index.jsx';
import About from './components/About/index.jsx';
import Contact from './components/Contact/index.jsx';
import Login from './components/Login/index.jsx';
import Signup from './components/Signup/index.jsx';
import Dashboard from './components/Dashboard/index.jsx';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomeWithHeader />} />
          <Route path="/about" element={<AboutWithHeader />} />
          <Route path="/contact" element={<ContactWithHeader />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
        </Routes>
      </>
    </Router>
  );
}

const WithHeaderAndFooter = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const HomeWithHeader = () => <WithHeaderAndFooter><Home /></WithHeaderAndFooter>;
const AboutWithHeader = () => <WithHeaderAndFooter><About /></WithHeaderAndFooter>;
const ContactWithHeader = () => <WithHeaderAndFooter><Contact /></WithHeaderAndFooter>;

export default App;
