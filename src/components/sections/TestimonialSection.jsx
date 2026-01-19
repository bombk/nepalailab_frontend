import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import api from '../../api/client';

const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('testimonials/')
            .then(res => {
                setTestimonials(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch testimonials", err);
                setLoading(false);
            });
    }, []);

    if (loading) return null;
    if (testimonials.length === 0) return null;

    return (
        <section id="feedback" className="py-24 px-[5%] relative overflow-hidden bg-white/[0.02]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="flex items-center gap-2 px-3 py-1 w-fit rounded-full glass text-[10px] font-black uppercase tracking-widest text-accent mb-4 mx-auto">
                        <Star className="w-3 h-3" /> Community Feedback
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6">
                        Voices from the <span className="text-gradient">Ecosystem</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We are proud to support researchers, developers, and organizations pushing the boundaries of AI in Nepal and beyond.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-[40px] relative group hover:border-accent/30 transition-all"
                        >
                            <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-accent/10 transition-colors" />

                            <div className="flex flex-col h-full">
                                <p className="text-gray-300 italic mb-8 relative z-10">
                                    "{t.feedback}"
                                </p>

                                <div className="mt-auto flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full glass overflow-hidden flex-shrink-0">
                                        {t.avatar_url ? (
                                            <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-white/10 flex items-center justify-center font-bold text-gray-500">
                                                {t.name[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white">{t.name}</h4>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                                            {t.role} {t.company && `@ ${t.company}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
