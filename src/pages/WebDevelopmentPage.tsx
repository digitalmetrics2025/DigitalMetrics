import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceLandingPage from '../components/ServiceLandingPage';
import { servicesData } from '../data/servicesData';

const WebDevelopmentPage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <ServiceLandingPage service={servicesData['web-development']} />
      <Footer />
    </div>
  );
};

export default WebDevelopmentPage;