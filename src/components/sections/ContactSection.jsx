import React, { useState } from 'react';
import { Mail, Send, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import api from '../../api/client';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('contact-messages/', formData);
            setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
            setFormData({ full_name: '', email: '', subject: '', message: '' });
        } catch {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        }
        setLoading(false);
        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <section id="contact" className="py-24 px-[5%] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: Info */}
                    <div className="space-y-12">
                        <div>
                            <div className="flex items-center gap-2 px-3 py-1 w-fit rounded-full glass text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                                <Mail className="w-3 h-3" /> Get in Touch
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">
                                Let's build the <span className="text-gradient">future</span> together.
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                                Whether you're a researcher, a developer, or just curious about AI in Nepal, we'd love to hear from you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: MapPin, text: 'Kathmandu, Nepal', label: 'Our Base' },
                                { icon: Mail, text: 'nepalailab@gmail.com', label: 'Email Us' },
                                { icon: Phone, text: '+977 9849861528', label: 'Call Us' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.label}</p>
                                        <p className="text-white font-bold">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Follow our research</p>
                            <div className="flex gap-4">
                                {[Github, Linkedin, Twitter].map((Icon, i) => (
                                    <button key={i} className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all">
                                        <Icon className="w-5 h-5 text-gray-400" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full -z-10" />
                        <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[40px] space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/5 rounded-full px-6 py-4 focus:outline-none focus:border-primary/50 text-white"
                                        placeholder="Enter Fullname"
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
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Subject</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-full px-6 py-4 focus:outline-none focus:border-primary/50 text-white"
                                    placeholder="Partnership Opportunity"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Message</label>
                                <textarea
                                    rows="4"
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-[30px] px-6 py-4 focus:outline-none focus:border-primary/50 text-white resize-none"
                                    placeholder="Tell us about your project or inquiry..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 rounded-full bg-primary text-black font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        Send Message <Send className="w-5 h-5" />
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
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
