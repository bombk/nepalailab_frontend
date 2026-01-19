import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Calendar, User } from 'lucide-react';
import api from '@/api/client';

const InsightSection = () => {
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('insights/')
            .then(res => {
                setInsights(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch insights", err);
                setError("Failed to load insights. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-10">Loading insights...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (insights.length === 0) return <div className="text-center py-10">No insights available at the moment.</div>;

    return (
        <section id="insights" className="py-24 px-[5%] relative">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-2 px-3 py-1 w-fit rounded-full glass text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                            <BookOpen className="w-3 h-3" /> Research & Articles
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black">
                            Latest <span className="text-gradient">Insights</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-md">
                        Deep dives into AI research, engineering challenges, and the future of technology in Nepal.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {insights.map((insight, index) => (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col glass rounded-[40px] overflow-hidden hover:border-primary/30 transition-all"
                        >
                            <div className="aspect-video w-full overflow-hidden relative">
                                {insight.image_url ? (
                                    <img
                                        src={insight.image_url}
                                        alt={insight.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                        <BookOpen className="w-12 h-12 text-white/10" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-white/80">
                                    {insight.category}
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(insight.created_at).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1"><User size={12} /> {insight.author}</span>
                                </div>
                                <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                    {insight.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-8 line-clamp-3">
                                    {insight.summary}
                                </p>
                                <button className="mt-auto flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:gap-3 transition-all">
                                    Read Article <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InsightSection;
