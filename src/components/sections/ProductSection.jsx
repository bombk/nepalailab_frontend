import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers, Play, X, Info } from 'lucide-react';
import api from '@/api/client';

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        api.get('products/')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products", err);
                setError("Failed to load products. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-10">Loading products...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (products.length === 0) return <div className="text-center py-10">No products available at the moment.</div>;

    return (
        <section id="projects" className="py-24 px-[5%] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />

            <div className="relative z-10 flex flex-col items-center mb-16">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                    <Layers className="w-3 h-3" /> Our Products
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-center">
                    Intelligence in <span className="text-gradient">Action</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        whileHover={{ y: -10 }}
                        className="glass p-6 rounded-3xl flex flex-col h-full group cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                    >
                        <div className="w-full aspect-video bg-white/5 rounded-2xl mb-6 overflow-hidden relative">
                            {product.image_url ? (
                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-700 font-bold opacity-20">No Preview</div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-xs font-bold">
                                    <Info className="w-4 h-4" /> View Details
                                </span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-black mb-3">{product.name}</h3>
                        <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-2">{product.description}</p>

                        <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                            {product.github_url && (
                                <a href={product.github_url} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:text-primary transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {product.demo_url && (
                                <a href={product.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold hover:text-primary transition-colors">
                                    <ExternalLink className="w-4 h-4" /> Live Demo
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setSelectedProduct(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="relative w-full max-w-5xl glass rounded-[40px] overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-6 right-6 z-50 p-3 glass rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-8 md:p-12 space-y-8">
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black mb-4">{selectedProduct.name}</h2>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {selectedProduct.technologies_used?.split(',').map(tech => (
                                                tech.trim() && (
                                                    <span key={tech} className="px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
                                                        {tech.trim()}
                                                    </span>
                                                )
                                            ))}
                                        </div>
                                        <p className="text-gray-400 text-lg leading-relaxed">
                                            {selectedProduct.long_description || selectedProduct.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        {selectedProduct.demo_url && (
                                            <a href={selectedProduct.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 px-8 py-3">
                                                <ExternalLink className="w-5 h-5" /> Visit Live Site
                                            </a>
                                        )}
                                        {selectedProduct.github_url && (
                                            <a href={selectedProduct.github_url} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-2 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                                                <Github className="w-5 h-5" /> Source Code
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-black/50 p-4 md:p-8 flex flex-col justify-center border-l border-white/5">
                                    <div className="w-full aspect-video rounded-3xl overflow-hidden glass relative group">
                                        {selectedProduct.demo_video_url ? (
                                            (selectedProduct.demo_video_url.includes('youtube.com') || selectedProduct.demo_video_url.includes('youtu.be')) ? (
                                                <iframe
                                                    className="w-full h-full"
                                                    src={selectedProduct.demo_video_url.includes('watch?v=')
                                                        ? selectedProduct.demo_video_url.replace('watch?v=', 'embed/')
                                                        : selectedProduct.demo_video_url.includes('/shorts/')
                                                            ? selectedProduct.demo_video_url.replace('/shorts/', '/embed/')
                                                            : selectedProduct.demo_video_url.includes('youtu.be/')
                                                                ? `https://www.youtube.com/embed/${selectedProduct.demo_video_url.split('youtu.be/')[1]}`
                                                                : selectedProduct.demo_video_url
                                                    }
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <video
                                                    controls
                                                    className="w-full h-full object-cover"
                                                    src={selectedProduct.demo_video_url}
                                                />
                                            )
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                                                <div className="w-20 h-20 rounded-full glass flex items-center justify-center">
                                                    <Play className="w-10 h-10 opacity-20" />
                                                </div>
                                                <span className="text-sm font-bold uppercase tracking-widest opacity-50">No Video Demo Available</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="mt-8 text-xs text-center text-gray-500 font-bold uppercase tracking-[0.2em]">
                                        Product Demonstration & Walkthrough
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ProductSection;
