import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import ProductSection from './components/sections/ProductSection';
import ServiceSection from './components/sections/ServiceSection';
import TechSection from './components/sections/TechSection';
import TeamSection from './components/sections/TeamSection';
import ContactSection from './components/sections/ContactSection';
import MissionSection from './components/sections/MissionSection';
import InsightSection from './components/sections/InsightSection';
import Newsletter from './components/sections/Newsletter';
import PartnerSection from './components/sections/PartnerSection';
import TestimonialSection from './components/sections/TestimonialSection';
import BlogSection from './components/sections/BlogSection';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import JoinUsModal from './components/modals/JoinUsModal';
import { checkHealth } from './api/client';

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    checkHealth()
      .then((data) => setApiStatus(data.status))
      .catch(() => setApiStatus('Disconnected'));
  }, []);

  const HomePage = () => (
    <div className="min-h-screen">
      <Navbar onJoinClick={() => setIsJoinModalOpen(true)} />
      <main>
        <Hero onJoinClick={() => setIsJoinModalOpen(true)} />
        <MissionSection />
        <ProductSection />
        <ServiceSection />
        <TechSection />
        <InsightSection />
        <BlogSection />
        <TestimonialSection />
        <TeamSection />
        <PartnerSection />
        <ContactSection />
        <Newsletter />
      </main>

      <Footer />

      <JoinUsModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />

      {/* API Connectivity Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest glass flex items-center gap-2 ${apiStatus === 'ok' ? 'text-primary' : 'text-accent'
          }`}>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${apiStatus === 'ok' ? 'bg-primary' : 'bg-accent'
            }`} />
          API Status: {apiStatus}
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogListPage onJoinClick={() => setIsJoinModalOpen(true)} />} />
        <Route path="/about" element={<AboutUsPage onJoinClick={() => setIsJoinModalOpen(true)} />} />
        <Route path="/blog/:slug" element={<BlogDetailPage onJoinClick={() => setIsJoinModalOpen(true)} />} />
      </Routes>
    </Router>
  );
}

export default App;
