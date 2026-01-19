import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/api/client';

const PartnerSection = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('partners/')
            .then(res => {
                setPartners(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch partners", err);
                setError("Failed to load partners. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-10">Loading partners...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (partners.length === 0) return <div className="text-center py-10">No partners available at the moment.</div>;

    return (
        <section className="py-12 px-[5%] border-y border-white/5 bg-black/20">
            <div className="max-w-7xl mx-auto">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-10">
                    Trusted & Powered By
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity">
                    {partners.map((partner) => (
                        <motion.a
                            key={partner.id}
                            href={partner.website_url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        >
                            <img
                                src={partner.logo_url}
                                alt={partner.name}
                                className="h-8 md:h-12 w-auto object-contain"
                            />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;
