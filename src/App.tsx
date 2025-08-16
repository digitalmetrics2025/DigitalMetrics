import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import LoadingFallback from './components/LoadingFallback';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import AdminPanel from './components/AdminPanel';
import SEOPage from './pages/SEOPage';
import SocialMediaPage from './pages/SocialMediaPage';
import PPCPage from './pages/PPCPage';
import EmailMarketingPage from './pages/EmailMarketingPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import MobileAppsPage from './pages/MobileAppsPage';
import EcommercePage from './pages/EcommercePage';
import UIUXDesignPage from './pages/UIUXDesignPage';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

const HomePage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/services/seo" element={<SEOPage />} />
            <Route path="/services/social-media" element={<SocialMediaPage />} />
            <Route path="/services/ppc" element={<PPCPage />} />
            <Route path="/services/email-marketing" element={<EmailMarketingPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/mobile-apps" element={<MobileAppsPage />} />
            <Route path="/services/ecommerce" element={<EcommercePage />} />
            <Route path="/services/ui-ux-design" element={<UIUXDesignPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;