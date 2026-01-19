import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BrainCircuitIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ onJoinClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Projects', href: '#projects' },
        { name: 'Services', href: '#services' },
        { name: 'Blog', href: '/blog' },
        { name: 'Our Team', href: '#team' },
        { name: 'Community', href: '#feedback' },
        { name: 'Contact', href: '#contact' },
        { name: 'About Us', href: '/about' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-2xl' : 'py-5'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                            <BrainCircuitIcon className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white">NepalAI <span className="text-primary">Lab</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            link.href.startsWith('/') ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-sm font-bold text-gray-200 hover:text-white transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-bold text-gray-200 hover:text-white transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                </a>
                            )
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Desktop CTA Button */}
                        <button
                            onClick={onJoinClick}
                            className="hidden md:block px-6 py-2 bg-primary text-black font-black text-sm hover:scale-105 transition-transform"
                        >
                            Join Us
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass shadow-2xl border border-white/10 mt-2"
                    >
                        <div className="px-6 py-4">
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    link.href.startsWith('/') ? (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-lg font-bold text-gray-400 hover:text-white py-3 border-b border-white/10 last:border-b-0 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-lg font-bold text-gray-400 hover:text-white py-3 border-b border-white/10 last:border-b-0 transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    )
                                ))}
                                <button
                                    onClick={() => {
                                        onJoinClick();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full py-4 bg-primary text-black font-black mt-2 hover:scale-[1.02] transition-transform"
                                >
                                    Join Us
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;