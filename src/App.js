import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import Home from './components/Home/index.jsx';
import About from './components/About/index.jsx';
import Contact from './components/Contact/index.jsx';
import Login from './components/Login/index.jsx';
import Signup from './components/Signup/index.jsx';
import Dashboard from './components/Dashboard/index.jsx';
import MembershipForm from './components/MembershipForm/index.jsx';
import Success from './components/Success.jsx';
import Cancel from './components/Cencel.jsx';
import OtpVerification from './components/Signup/OtpVerification.jsx';
import Videos from './components/Videos/index.jsx';
import WatchVideo from './components/Videos/WatchVideo.jsx';

function App() {
  const user = useSelector(state => state?.auth?.user);
  console.log(user);
  const environment = process.env.NODE_ENV;
  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
    return user ? element : element;
  };

  const SignupProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/Signup" />;
    return user ? element : element;
  };

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomeWithHeader />} />
          <Route path="/about" element={<AboutWithHeader />} />
          <Route path="/contact" element={<ContactWithHeader />} />
          {/* <Route path='/login' element={<Login />} /> */}
          {environment === 'production' ? (
            <Route path="/login" element={<ComingSoon />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          <Route path='/signup' element={<Signup />} />
          <Route
            path="/dashboard/*"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/membership"
            element={<SignupProtectedRoute element={<MembershipForm user={user} />} />}
          />
          <Route
            path="/otp"
            element={<SignupProtectedRoute element={<OtpVerification user={user} />} />}
          />
          <Route
            path="/success"
            element={<ProtectedRoute element={<Success />} />}
          />
          <Route
            path="/cancel"
            element={<ProtectedRoute element={<Cancel />} />}
          />
          <Route path="/videos" element={<VideosWithHeader />} />
          <Route path='/videos/:id' element={<WatchVideoHeader />} />
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
const VideosWithHeader = () => <WithHeaderAndFooter><Videos /></WithHeaderAndFooter>;
const WatchVideoHeader = () => <WithHeaderAndFooter><WatchVideo /></WithHeaderAndFooter>;
const ComingSoon = () => (
  <div className="container">
    <h1>Coming Soon...</h1>
  </div>
);

export default App;
