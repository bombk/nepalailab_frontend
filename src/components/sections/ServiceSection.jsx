import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../api/client';

const ServiceSection = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        api.get('services/')
            .then(res => setServices(res.data))
            .catch(err => console.error("Failed to fetch services", err));
    }, []);

    if (services.length === 0) return null;

    return (
        <section id="services" className="py-24 px-[5%] bg-black/30">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black mb-16">Expertise & <span className="text-gradient">Services</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service) => {
                        const IconComponent = LucideIcons[service.icon_name] || LucideIcons.Activity;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="group p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-primary/20 transition-all"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <IconComponent size={32} />
                                </div>
                                <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{service.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;
