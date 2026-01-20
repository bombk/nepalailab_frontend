import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Zap } from 'lucide-react';

const MissionSection = () => {
    return (
        <section id="about" className="py-24 px-[5%] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/2 flex items-center justify-center -z-10">
                <div className="w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center gap-2 px-3 py-1 w-fit rounded-full glass text-[10px] font-black uppercase tracking-widest text-secondary mb-6 mx-auto lg:ml-0">
                        <Zap className="w-3 h-3" /> Our Mission
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-snug">
                        Revolutionizing Businesses with <br />
                        <span className="text-secondary">AI-Powered Solutions</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 font-medium">
                        Empowering Nepali and global businesses to thrive in the digital age with cutting-edge technology and innovation.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="glass p-6 rounded-3xl group hover:border-secondary/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                                <Globe size={24} />
                            </div>
                            <h4 className="text-lg font-black mb-2">Empowering Businesses</h4>
                            <p className="text-sm text-gray-400">Providing AI-driven solutions to help businesses in Nepal and globally achieve operational excellence.</p>
                        </div>
                        <div className="glass p-6 rounded-3xl group hover:border-primary/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <Users size={24} />
                            </div>
                            <h4 className="text-lg font-black mb-2">Driving Innovation</h4>
                            <p className="text-sm text-gray-400">Fostering a culture of innovation to create impactful AI solutions for businesses worldwide.</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative z-10 aspect-square max-w-md mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[80px] rotate-6 blur-2xl -z-10" />
                        <div className="w-full h-full glass rounded-[40px] border-white/20 flex items-center justify-center p-0 relative overflow-hidden">
                            <img
                                src="office.png"
                                alt="Company Image"
                                className="w-full h-full object-fill rounded-[40px]"
                            />

                            {/* Floating Orbs */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute top-10 right-10 w-16 h-16 rounded-full bg-primary/20 blur-xl"
                            />
                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ repeat: Infinity, duration: 6 }}
                                className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-secondary/20 blur-xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
