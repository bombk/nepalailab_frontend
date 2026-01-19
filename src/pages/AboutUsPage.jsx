import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/layout/Footer';
import { Target, Globe, Users, Award, Heart } from 'lucide-react';

const AboutUsPage = () => {
    const handleJoinClick = () => {
        console.log('Join Us clicked');
    };

    const values = [
        { icon: <Target className="w-6 h-6" />, title: 'Innovation', desc: 'Pushing the boundaries of technology' },
        { icon: <Users className="w-6 h-6" />, title: 'Collaboration', desc: 'Partnering with businesses and communities' },
        { icon: <Heart className="w-6 h-6" />, title: 'Integrity', desc: 'Upholding highest ethical standards' },
        { icon: <Award className="w-6 h-6" />, title: 'Impact', desc: 'Making positive difference in lives' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <Navbar onJoinClick={handleJoinClick} />
            
            <section className="py-24 px-[5%] pt-32">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            About NepalAI Lab
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Where innovation meets purpose in the heart of Nepal's AI revolution
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="glass rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <Target className="w-8 h-8 text-primary" />
                                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                            </div>
                            <p className="text-lg text-gray-400">
                                To empower Nepali and global businesses with cutting-edge AI solutions that drive efficiency, productivity, and growth. We create AI solutions that are accessible, impactful, and tailored to unique challenges.
                            </p>
                        </div>
                        
                        <div className="glass rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <Globe className="w-8 h-8 text-primary" />
                                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                            </div>
                            <p className="text-lg text-gray-400">
                                To be a global leader in AI innovation, driving positive change and enabling businesses to achieve their full potential through transformative technology.
                            </p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="glass rounded-2xl p-8 mb-12">
                        <p className="text-lg text-gray-400 leading-relaxed mb-6">
                            Welcome to Nepal AI Lab, where innovation meets purpose. Our mission is to empower Nepali and global businesses with cutting-edge AI solutions that drive efficiency, productivity, and growth. We believe in the transformative power of artificial intelligence to solve real-world problems and create a better future for everyone.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed mb-6">
                            At Nepal AI Lab, we specialize in developing AI-driven products tailored to the unique needs of businesses in Nepal and around the world. From automating repetitive tasks to providing advanced analytics and insights, our solutions are designed to help businesses thrive in the digital age.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Core Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <div key={index} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                                    <div className="text-primary mb-4">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-gray-400">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Stats */}
                    <div className="glass rounded-2xl p-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-8">Our Impact</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: '50+', label: 'Team Members' },
                                { value: '100+', label: 'Projects' },
                                { value: '10+', label: 'AI Products' },
                                { value: '24/7', label: 'Support' },
                            ].map((stat, index) => (
                                <div key={index}>
                                    <h3 className="text-4xl font-black text-primary mb-2">{stat.value}</h3>
                                    <p className="text-gray-400 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default AboutUsPage;