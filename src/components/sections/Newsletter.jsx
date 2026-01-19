import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import api from '../../api/client';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('newsletter/', { email });
            setStatus('success');
            setEmail('');
        } catch (err) {
            console.error("Subscription failed", err);
            setStatus('error');
        }
    };

    return (
        <section className="py-24 px-[5%]">
            <div className="max-w-4xl mx-auto glass p-8 md:p-16 rounded-[60px] relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10" />

                <h2 className="text-3xl md:text-5xl font-black mb-6">Stay in the <span className="text-gradient">Loop</span></h2>
                <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                    Subscribe to our newsletter to receive the latest research updates, open-source projects, and lab news directly in your inbox.
                </p>

                {status === 'success' ? (
                    <div className="flex flex-col items-center gap-4 text-primary animate-in fade-in zoom-in duration-500">
                        <CheckCircle2 size={48} />
                        <p className="text-xl font-bold">Successfully Subscribed!</p>
                        <button onClick={() => setStatus('idle')} className="text-gray-500 text-sm hover:underline">Subscribe another email</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative group">
                        <input
                            required
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-8 py-5 rounded-full bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all pr-16 text-lg"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button
                            disabled={status === 'loading'}
                            className="absolute right-2 top-2 bottom-2 aspect-square rounded-full bg-primary text-dark flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            <Send size={20} />
                        </button>
                        {status === 'error' && <p className="mt-4 text-accent text-sm font-bold">Already subscribed or invalid email.</p>}
                    </form>
                )}
            </div>
        </section>
    );
};

export default Newsletter;
