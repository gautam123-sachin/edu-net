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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminLogin from './Admin-panel/Components/AdminLogin/AdminLogin.js'

import AdminLayout from './Admin-panel/AdminLayout/AdminLayout.js'
import AdminRoute from './Admin-panel/AdminRoute/AdminRoute.js'
import AdminDashboard from './Admin-panel/Components/Dashboard/AdminDashboard.js'
import MemberList from './Admin-panel/Components/Member/MemberList.js'
import PaymentList from './Admin-panel/Components/Payment/PaymentList.js'


const theme = createTheme();
const NotAuthorized = () => <div>Not Authorized</div>;

function App() {
  const user = useSelector(state => state?.auth?.user);

  const environment = process.env.NODE_ENV;

  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  const SignupProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/Signup" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <>
          <Routes>
            {/* start admin router */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route
                path="/admin-dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/member-list"
                element={
                  <AdminRoute>
                    <MemberList />
                  </AdminRoute>
                }
              />
              <Route
                path="/payment-request-list"
                element={
                  <AdminRoute>
                    <PaymentList />
                  </AdminRoute>
                }
              />
              <Route path="*" element={<NotAuthorized />} />
            </Route>
            {/* end admin */}
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
    </ThemeProvider>
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