import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import api from '../api/client';
import Navbar from '../components/Navbar';
import Footer from '../components/layout/Footer';

const BlogDetailPage = ({ onJoinClick }) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await api.get(`blog-posts/?slug=${slug}`);
                const data = response.data;

                // Handle paginated response from DRF
                const blogPosts = Array.isArray(data) ? data : data.results || [];
                
                if (blogPosts.length > 0) {
                    const blog = blogPosts[0];
                    
                    // Construct full image URL if image_url is a relative path
                    let imageUrl = blog.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop';
                    
                    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('https')) {
                        const apiUrl = api.defaults.baseURL || 'http://localhost:8000/api/';
                        const baseUrl = apiUrl.replace('/api/', '');
                        imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
                    }
                    
                    setBlog({
                        id: blog.id,
                        title: blog.title,
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
                        tags: blog.tags
                    });
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBlog();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
                <Navbar onJoinClick={onJoinClick} />
                <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center py-12">
                        <p className="text-gray-400">Loading blog post...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
                <Navbar onJoinClick={onJoinClick} />
                <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center py-12">
                        <p className="text-gray-400 text-lg">Blog post not found.</p>
                        <button
                            onClick={() => navigate('/blog')}
                            className="mt-4 inline-flex items-center text-[#00f2fe] font-semibold hover:text-[#f093fb]"
                        >
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Blog
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
            <Navbar onJoinClick={onJoinClick} />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#00f2fe]/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-[#f093fb]/20 rounded-full blur-[120px] animate-pulse" />

                <article className="max-w-4xl mx-auto relative z-10">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/blog')}
                        className="inline-flex items-center text-[#00f2fe] font-semibold hover:text-[#f093fb] mb-8 transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Blog
                    </button>

                    {/* Blog Header Image */}
                    <div className="mb-12 rounded-2xl overflow-hidden h-96 md:h-[500px]">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="space-y-8">
                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                            {blog.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-6 text-gray-400 pb-8 border-b border-white/10">
                            <div className="flex items-center space-x-2">
                                <User size={20} />
                                <span className="text-lg">{blog.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar size={20} />
                                <span className="text-lg">{blog.date}</span>
                            </div>
                            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-bold">
                                {blog.category}
                            </span>
                            <span className="text-lg">{blog.readTime}</span>
                        </div>

                        {/* Blog Content - Rendered as HTML */}
                        <div className="prose prose-invert max-w-none">
                            <div
                                className="text-gray-300 leading-relaxed text-lg"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                        </div>

                        {/* Tags */}
                        {blog.tags && (
                            <div className="pt-8 border-t border-white/10">
                                <h3 className="text-white font-bold mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-3">
                                    {blog.tags.split(',').map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 rounded-full bg-white/10 text-[#00f2fe] border border-white/20 hover:border-[#00f2fe]/50 transition-colors"
                                        >
                                            #{tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Back to Blog Link */}
                        <div className="pt-8 border-t border-white/10">
                            <button
                                onClick={() => navigate('/blog')}
                                className="inline-flex items-center text-[#00f2fe] font-semibold hover:text-[#f093fb] text-lg transition-colors"
                            >
                                <ArrowLeft size={20} className="mr-2" />
                                Back to All Posts
                            </button>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogDetailPage;
