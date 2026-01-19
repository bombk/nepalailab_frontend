import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/client';

const TechSection = () => {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        api.get('tech-stack/')
            .then(res => setTechs(res.data))
            .catch(err => console.error("Failed to fetch tech stack", err));
    }, []);

    if (techs.length === 0) return null;

    const categories = [...new Set(techs.map(t => t.category))];

    return (
        <section className="py-24 px-[5%]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black mb-16 text-center">Powering the <span className="text-gradient">Future</span></h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {categories.map((category) => (
                        <div key={category} className="space-y-6 text-center lg:text-left">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">{category}</h3>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                {techs.filter(t => t.category === category).map(tech => (
                                    <motion.div
                                        key={tech.id}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-6 py-3 rounded-2xl glass text-sm font-bold border-l-2 border-primary/50"
                                    >
                                        {tech.name}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechSection;
