import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageCircle, X, Send, Shield } from 'lucide-react';
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
import api from './api/client'; // Import your api client

// Chatbot component
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm here to help. How can I assist you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Use your api client with the relative URL
      const response = await api.post('chat/', {
        message: inputMessage,
        conversation_id: localStorage.getItem('chat_conversation_id') || null,
        user_id: localStorage.getItem('user_id') || 'anonymous',
        timestamp: new Date().toISOString()
      });

      const data = response.data;

      // Save conversation ID for continuing the chat
      if (data.conversation_id) {
        localStorage.setItem('chat_conversation_id', data.conversation_id);
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data.response || data.message || "I received your message.",
        sender: 'bot',
        timestamp: new Date(),
        metadata: data.metadata || {}
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      
      // Handle different error formats
      let errorMessage = "Sorry, I'm having trouble connecting to the server. Please try again later.";
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data?.error || 
                      error.response.data?.detail || 
                      `Server error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Please check your connection.";
      }
      
      const errorBotMessage = {
        id: Date.now() + 1,
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([
      { id: 1, text: "Hello! I'm here to help. How can I assist you today?", sender: 'bot', timestamp: new Date() }
    ]);
    localStorage.removeItem('chat_conversation_id');
  };

  return (
    <>
      {/* Chat Button - Enhanced with beautiful cyan-blue gradient */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 hover:shadow-cyan-glow hover:scale-110 ${isOpen ? 'hidden' : 'flex items-center justify-center'}`}
        style={{
          background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
          color: 'black',
          boxShadow: '0 0 25px rgba(0, 242, 254, 0.6), 0 0 50px rgba(79, 172, 254, 0.4)',
        }}
        aria-label="Open chat"
      >
        <MessageCircle 
          size={24} 
          className="animate-pulse" 
          strokeWidth={2}
        />
        {/* Glowing ring effect */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-300/40 animate-ping"></div>
      </button>

      {/* Chat Window - Enhanced with beautiful cyan-blue colors */}
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 z-50 w-80 h-96 flex flex-col rounded-2xl shadow-2xl overflow-hidden border-2 border-cyan-300/30 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(240, 249, 255, 0.98) 100%)',
            boxShadow: '0 25px 70px rgba(0, 242, 254, 0.3), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          {/* Header - Enhanced cyan-blue gradient */}
          <div 
            className="p-4 flex justify-between items-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 50%, #00d4ff 100%)',
              color: 'black',
            }}
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-100/20 to-transparent animate-shimmer"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0f7ff 100%)',
                  boxShadow: '0 4px 20px rgba(0, 242, 254, 0.3), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
              >
                <MessageCircle 
                  size={20} 
                  style={{ stroke: '#00f2fe' }}
                  strokeWidth={2}
                />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide text-black">AI Assistant</h3>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' }}
                  ></div>
                  <p className="text-xs opacity-90 text-black/80">Online • Ready to help</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="relative z-10 hover:bg-black/10 p-2 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="Clear chat"
                style={{
                  backdropFilter: 'blur(4px)',
                }}
                title="Clear conversation"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-10 hover:bg-black/10 p-2 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90"
                aria-label="Close chat"
                style={{
                  backdropFilter: 'blur(4px)',
                }}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Messages Container - Enhanced with cyan-blue gradients */}
          <div 
            className="flex-1 overflow-y-auto p-4"
            style={{
              background: 'radial-gradient(circle at 20% 80%, rgba(0, 242, 254, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(79, 172, 254, 0.08) 0%, transparent 50%)',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 text-sm backdrop-blur-sm ${msg.sender === 'user'
                    ? 'text-black shadow-lg'
                    : 'text-gray-800 shadow-lg'
                    }`}
                  style={
                    msg.sender === 'user'
                      ? {
                          background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                          boxShadow: '0 6px 25px rgba(0, 242, 254, 0.4), 0 2px 6px rgba(0, 0, 0, 0.1)',
                          borderRadius: '18px 18px 4px 18px',
                        }
                      : {
                          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
                          border: '1px solid rgba(173, 216, 230, 0.4)',
                          borderRadius: '18px 18px 18px 4px',
                        }
                  }
                >
                  <div className={`${msg.sender === 'user' ? 'text-black/90' : 'text-gray-700'}`}>
                    {msg.text}
                  </div>
                  <div 
                    className={`text-xs mt-2 font-medium ${msg.sender === 'user' ? 'text-black/60' : 'text-gray-500'}`}
                  >
                    {formatTime(new Date(msg.timestamp))}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-3">
                <div 
                  className="inline-block rounded-2xl px-4 py-3 text-sm shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(173, 216, 230, 0.4)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' }}
                    ></div>
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ 
                        background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                        animationDelay: '0.1s' 
                      }}
                    ></div>
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ 
                        background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                        animationDelay: '0.2s' 
                      }}
                    ></div>
                    <span 
                      className="text-xs ml-2 font-medium"
                      style={{ color: '#00a8cc' }}
                    >
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Enhanced with cyan-blue theme */}
          <div 
            className="border-t border-cyan-200/50 p-4 relative"
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(240, 249, 255, 0.98) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Subtle top border glow */}
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.5), transparent)',
              }}
            ></div>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(0, 242, 254, 0.3)',
                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.03)',
                  color: '#2c5282',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                  color: 'black',
                  boxShadow: '0 4px 20px rgba(0, 242, 254, 0.4)',
                  minWidth: '44px',
                }}
              >
                <Send size={20} strokeWidth={2} />
              </button>
            </div>
            <p 
              className="text-xs text-center mt-3 font-medium tracking-wide"
              style={{ 
                color: '#00a8cc',
                letterSpacing: '0.025em',
              }}
            >
              <span className="inline-flex items-center gap-1">
                <Shield size={12} strokeWidth={2} />
                End-to-end encrypted • Your privacy matters
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    api.get('health/')
      .then((response) => setApiStatus(response.data.status))
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

      {/* Chatbot Component - Replaces API Status */}
      <Chatbot />
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