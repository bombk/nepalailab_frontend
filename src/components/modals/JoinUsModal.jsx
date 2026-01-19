import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Rocket, Sparkles, Brain, Code } from 'lucide-react';
import api from '../../api/client';

const JoinUsModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        interest_area: '',
        message: ''
    });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('join-requests/', formData);
            setStatus({ type: 'success', message: 'Application submitted! We will contact you soon.' });
            setTimeout(() => {
                onClose();
                setFormData({ full_name: '', email: '', interest_area: '', message: '' });
                setStatus(null);
            }, 3000);
        } catch {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        }
        setLoading(false);
    };

    const interestAreas = [
        { id: 'research', label: 'Research', icon: Brain },
        { id: 'development', label: 'Development', icon: Code },
        { id: 'partnership', label: 'Partnership', icon: Sparkles },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl glass rounded-[40px] overflow-hidden bg-[#050505]"
                    >
                        <div className="p-8 md:p-12 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                                    <Rocket className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-3xl font-black">Join the <span className="text-gradient">Mission</span></h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/5 rounded-full px-6 py-4 focus:outline-none focus:border-primary/50 text-white"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-white/5 border border-white/5 rounded-full px-6 py-4 focus:outline-none focus:border-primary/50 text-white"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Interest Area</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {interestAreas.map((area) => (
                                            <button
                                                key={area.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, interest_area: area.id })}
                                                className={`p-4 rounded-3xl border transition-all flex flex-col items-center gap-3 ${formData.interest_area === area.id
                                                    ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(0,255,204,0.2)]'
                                                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                                                    }`}
                                            >
                                                <area.icon className={`w-5 h-5 ${formData.interest_area === area.id ? 'text-primary' : 'text-gray-400'}`} />
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${formData.interest_area === area.id ? 'text-primary' : 'text-gray-500'}`}>
                                                    {area.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Why do you want to join us?</label>
                                    <textarea
                                        rows="3"
                                        required
                                        className="w-full bg-white/5 border border-white/5 rounded-[30px] px-6 py-4 focus:outline-none focus:border-primary/50 text-white resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 rounded-full bg-primary text-black font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Submitting...' : (
                                        <>
                                            Submit Application <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                {status && (
                                    <p className={`text-center text-sm font-bold ${status.type === 'success' ? 'text-primary' : 'text-accent'}`}>
                                        {status.message}
                                    </p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default JoinUsModal;
