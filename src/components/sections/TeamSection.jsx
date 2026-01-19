import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Users } from 'lucide-react';
import api from '../../api/client';

const TeamSection = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('team-members/')
            .then(res => {
                setTeam(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch team members", err);
                setLoading(false);
            });
    }, []);

    if (loading) return null;
    if (team.length === 0) return null;

    return (
        <section id="team" className="py-24 px-[5%] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />

            <div className="relative z-10 flex flex-col items-center mb-16">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                    <Users className="w-3 h-3" /> Our Team
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-center">
                    The <span className="text-gradient">Innovators</span> Behind
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {team.map((member) => (
                    <motion.div
                        key={member.id}
                        whileHover={{ y: -10 }}
                        className="glass p-6 rounded-[40px] flex flex-col items-center text-center group"
                    >
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-white/10 group-hover:border-primary/50 transition-colors">
                            {member.image_url ? (
                                <img
                                    src={member.image_url}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                    <Users className="w-12 h-12 text-white/20" />
                                </div>
                            )}
                        </div>

                        <h3 className="text-xl font-black mb-1">{member.name}</h3>
                        <p className="text-primary text-sm font-bold mb-4">{member.role}</p>
                        <p className="text-gray-400 text-sm mb-6 line-clamp-3">{member.bio}</p>

                        <div className="flex gap-3 mt-auto">
                            {member.github_url && (
                                <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:text-primary transition-colors">
                                    <Github className="w-4 h-4" />
                                </a>
                            )}
                            {member.linkedin_url && (
                                <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:text-secondary transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
