import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Sparkles, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import api from "@/api/client";

const Hero = ({ onJoinClick }) => {
    const [carouselItems, setCarouselItems] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch carousel data from backend
    useEffect(() => {
        const fetchCarouselData = async () => {
            try {
                setLoading(true);
                const response = await api.get('carousel/');
                const data = response.data;

                // Handle paginated response from DRF
                const carouselPosts = Array.isArray(data) ? data : data.results || [];

                // Filter only active carousel items and format data
                const formattedCarousel = carouselPosts
                    .filter(item => item.is_active)
                    .sort((a, b) => a.order - b.order)
                    .map(item => {
                        // Construct full image URL if image is a relative path
                        let imageUrl = item.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop';
                        
                        // If image is a relative path (from ImageField), prepend the API base URL
                        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('https')) {
                            const apiUrl = api.defaults.baseURL || 'http://localhost:8000/api/';
                            const baseUrl = apiUrl.replace('/api/', '');
                            imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
                        }

                        return {
                            id: item.id,
                            title: item.title || "Slide",
                            caption: item.caption || "",
                            image: imageUrl,
                            link_url: item.link_url || "#"
                        };
                    });

                setCarouselItems(formattedCarousel);
            } catch (error) {
                console.error('Error fetching carousel data:', error);
                // Fallback data if API fails
                setCarouselItems([
                    {
                        id: 1,
                        title: "AI Research Hub",
                        caption: "Pioneering AI research in Nepal with cutting-edge projects",
                        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
                        link_url: "#research"
                    },
                    {
                        id: 2,
                        title: "Open Source Community",
                        caption: "Join 50+ contributors building the future of AI together",
                        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074&auto=format&fit=crop",
                        link_url: "#community"
                    },
                    {
                        id: 3,
                        title: "Machine Learning Projects",
                        caption: "Real-world applications solving Nepalese challenges",
                        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
                        link_url: "#projects"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchCarouselData();
    }, []);

    // Auto slide every 5 seconds
    useEffect(() => {
        if (carouselItems.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [carouselItems]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    };

    return (
        <div className="relative min-h-screen pt-20 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/20 rounded-full blur-[120px] animate-pulse" />

            {/* Carousel Section */}
            <div className="relative w-full max-w-6xl mx-auto mb-12">
                {loading ? (
                    <div className="h-[400px] flex items-center justify-center">
                        <div className="text-white">Loading carousel...</div>
                    </div>
                ) : (
                    <>
                        <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
                            {carouselItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="absolute inset-0 w-full h-full"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: index === currentSlide ? 1 : 0,
                                        scale: index === currentSlide ? 1 : 1.1
                                    }}
                                    transition={{ duration: 0.7 }}
                                >
                                    {/* Background Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-end items-center p-8">
                                        <motion.div
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{
                                                y: index === currentSlide ? 0 : 50,
                                                opacity: index === currentSlide ? 1 : 0
                                            }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            className="max-w-2xl"
                                        >
                                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                                                {item.title}
                                            </h2>
                                            <p className="text-lg md:text-xl text-gray-300 mb-6">
                                                {item.description}
                                            </p>
                                            <motion.a
                                                href={item.ctaLink}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="inline-flex items-center gap-2 bg-primary text-black font-black px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                                            >
                                                {item.ctaText}
                                            </motion.a>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Navigation Buttons */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 glass p-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 glass p-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {carouselItems.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-primary w-8' : 'bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Rest of the Hero Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16"
            >
                {[
                    { label: 'Open Source Projects', value: '10+' },
                    { label: 'Contributors', value: '50+' },
                    { label: 'Research Papers', value: '5+' },
                    { label: 'GitHub Stars', value: '500+' },
                ].map((stat) => (
                    <div key={stat.label} className="text-center">
                        <h3 className="text-2xl md:text-3xl font-black text-white">{stat.value}</h3>
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Hero;