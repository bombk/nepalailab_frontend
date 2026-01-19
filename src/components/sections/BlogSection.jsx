import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Fetch blog data from backend
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await api.get('blog-posts/');
                const data = response.data;
                
                // Handle paginated response from DRF
                const blogPosts = Array.isArray(data) ? data : data.results || [];
                
                // Filter only published blogs and format data
                const formattedBlogs = blogPosts
                    .filter(blog => blog.is_published)
                    .map(blog => {
                        // Construct full image URL if image_url is a relative path
                        let imageUrl = blog.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop';
                        
                        // If image_url is a relative path (from ImageField), prepend the API base URL
                        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('https')) {
                            const apiUrl = api.defaults.baseURL || 'http://localhost:8000/api/';
                            const baseUrl = apiUrl.replace('/api/', ''); // Get base URL without /api/
                            imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
                        }
                        
                        return {
                            id: blog.id,
                            title: blog.title,
                            excerpt: blog.excerpt || blog.content.substring(0, 150),
                            content: blog.content,
                            category: blog.tags ? blog.tags.split(',')[0].trim() : 'General',
                            author: blog.author || 'Nepal AI Lab',
                            date: new Date(blog.published_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }),
                            image: imageUrl,
                            readTime: `${Math.ceil(blog.content.split(' ').length / 200)} min read`,
                            slug: blog.slug
                        };
                    });
                
                setBlogs(formattedBlogs);
                setFilteredBlogs(formattedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                // Fallback data if API fails
                setBlogs([
                    {
                        id: 1,
                        title: "Getting Started with Machine Learning in Nepal",
                        excerpt: "Learn the basics of machine learning and how to apply it to solve real-world problems in Nepal.",
                        category: "Machine Learning",
                        author: "Dr. Ramesh Singh",
                        date: "January 15, 2026",
                        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
                        readTime: "5 min read",
                        link: "#blog/1"
                    },
                    {
                        id: 2,
                        title: "Open Source Contributions: A Guide for Beginners",
                        excerpt: "Step-by-step guide on how to contribute to open-source AI projects and build your portfolio.",
                        category: "Open Source",
                        author: "Priya Sharma",
                        date: "January 12, 2026",
                        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
                        readTime: "7 min read",
                        link: "#blog/2"
                    },
                    {
                        id: 3,
                        title: "Building Sustainable AI Solutions",
                        excerpt: "Exploring the intersection of AI and sustainability in developing nations.",
                        category: "AI Research",
                        author: "Amit Kumar",
                        date: "January 10, 2026",
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
                        readTime: "8 min read",
                        link: "#blog/3"
                    },
                    {
                        id: 4,
                        title: "AI in Healthcare: The Nepal Perspective",
                        excerpt: "How artificial intelligence is revolutionizing healthcare delivery in Nepal.",
                        category: "AI Research",
                        author: "Dr. Neha Desai",
                        date: "January 8, 2026",
                        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
                        readTime: "6 min read",
                        link: "#blog/4"
                    },
                    {
                        id: 5,
                        title: "Deep Learning: From Theory to Practice",
                        excerpt: "Deep dive into neural networks and practical implementation strategies.",
                        category: "Machine Learning",
                        author: "Sanjay Nath",
                        date: "January 5, 2026",
                        image: "https://images.unsplash.com/photo-1516321318423-f06f70504c4e?q=80&w=2070&auto=format&fit=crop",
                        readTime: "10 min read",
                        link: "#blog/5"
                    },
                    {
                        id: 6,
                        title: "Community Spotlight: Notable AI Projects",
                        excerpt: "Celebrating the amazing projects and achievements from our community members.",
                        category: "Community",
                        author: "Editorial Team",
                        date: "January 1, 2026",
                        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
                        readTime: "4 min read",
                        link: "#blog/6"
                    }
                ]);
                setFilteredBlogs([
                    {
                        id: 1,
                        title: "Getting Started with Machine Learning in Nepal",
                        excerpt: "Learn the basics of machine learning and how to apply it to solve real-world problems in Nepal.",
                        category: "Machine Learning",
                        author: "Dr. Ramesh Singh",
                        date: "January 15, 2026",
                        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
                        readTime: "5 min read",
                        link: "#blog/1"
                    },
                    {
                        id: 2,
                        title: "Open Source Contributions: A Guide for Beginners",
                        excerpt: "Step-by-step guide on how to contribute to open-source AI projects and build your portfolio.",
                        category: "Open Source",
                        author: "Priya Sharma",
                        date: "January 12, 2026",
                        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
                        readTime: "7 min read",
                        link: "#blog/2"
                    },
                    {
                        id: 3,
                        title: "Building Sustainable AI Solutions",
                        excerpt: "Exploring the intersection of AI and sustainability in developing nations.",
                        category: "AI Research",
                        author: "Amit Kumar",
                        date: "January 10, 2026",
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
                        readTime: "8 min read",
                        link: "#blog/3"
                    },
                    {
                        id: 4,
                        title: "AI in Healthcare: The Nepal Perspective",
                        excerpt: "How artificial intelligence is revolutionizing healthcare delivery in Nepal.",
                        category: "AI Research",
                        author: "Dr. Neha Desai",
                        date: "January 8, 2026",
                        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
                        readTime: "6 min read",
                        link: "#blog/4"
                    },
                    {
                        id: 5,
                        title: "Deep Learning: From Theory to Practice",
                        excerpt: "Deep dive into neural networks and practical implementation strategies.",
                        category: "Machine Learning",
                        author: "Sanjay Nath",
                        date: "January 5, 2026",
                        image: "https://images.unsplash.com/photo-1516321318423-f06f70504c4e?q=80&w=2070&auto=format&fit=crop",
                        readTime: "10 min read",
                        link: "#blog/5"
                    },
                    {
                        id: 6,
                        title: "Community Spotlight: Notable AI Projects",
                        excerpt: "Celebrating the amazing projects and achievements from our community members.",
                        category: "Community",
                        author: "Editorial Team",
                        date: "January 1, 2026",
                        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
                        readTime: "4 min read",
                        link: "#blog/6"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Filter blogs based on search and category
    useEffect(() => {
        let filtered = blogs;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(blog => blog.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBlogs(filtered);
    }, [searchTerm, selectedCategory, blogs]);

    const categories = ['All', 'Machine Learning', 'AI Research', 'Open Source', 'Community'];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#050505] to-[#0a0a0a] relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#00f2fe]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-[#f093fb]/20 rounded-full blur-[120px] animate-pulse" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#f093fb] mb-4">
                        Our Blog
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Insights, tutorials, and updates from the Nepal AI Lab community
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    className="mb-12 space-y-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#00f2fe]/30 bg-white/5 text-white placeholder-gray-400 focus:border-[#00f2fe] focus:ring-2 focus:ring-[#00f2fe]/50 outline-none transition"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black shadow-lg shadow-[#00f2fe]/50'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Blog Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Loading blogs...</p>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No blogs found. Try adjusting your search.</p>
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {filteredBlogs.map((blog) => (
                            <motion.article
                                key={blog.id}
                                variants={itemVariants}
                                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-[#00f2fe]/50 hover:shadow-lg hover:shadow-[#00f2fe]/20 transition-all duration-300 hover:scale-105"
                            >
                                {/* Blog Image */}
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                            {blog.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00f2fe] transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="space-y-3 mb-4 pb-4 border-b border-white/10">
                                        <div className="flex items-center text-sm text-gray-400 space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <User size={16} />
                                                <span>{blog.author}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <Calendar size={16} />
                                                <span>{blog.date}</span>
                                            </div>
                                            <span>{blog.readTime}</span>
                                        </div>
                                    </div>

                                    {/* Read More Link */}
                                    <Link
                                        to={`/blog/${blog.slug}`}
                                        className="inline-flex items-center text-[#00f2fe] font-semibold hover:text-[#f093fb] group/link transition-colors"
                                    >
                                        Read More
                                        <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default BlogSection;
