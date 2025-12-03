'use client';

import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';
import NeonButton from '@/components/ui/NeonButton';
import { useState } from 'react';
import { Send, ShieldCheck } from 'lucide-react';

export default function SubscribePage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setName('');
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 flex items-center justify-center">
            <div className="max-w-2xl w-full mx-auto">
                <div className="text-center mb-12">
                    <GlitchText
                        text="Únete al Vórtice"
                        as="h1"
                        className="text-4xl md:text-6xl font-bold mb-6"
                    />
                    <p className="text-xl text-gray-300 leading-relaxed">
                        El futuro no espera a nadie. Suscríbete para recibir análisis profundos,
                        ficción especulativa y las señales del cambio antes que el resto.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-[100px] -z-10" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px] -z-10" />

                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-6 text-neon-green">
                                <Send size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">¡Bienvenido a bordo!</h3>
                            <p className="text-gray-400">Has dado el primer paso hacia el futuro. Revisa tu bandeja de entrada.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-8 text-neon-blue hover:text-white transition-colors text-sm font-mono"
                            >
                                Enviar otro correo
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-mono text-neon-blue uppercase tracking-wider">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors placeholder:text-gray-600"
                                    placeholder="Tu nombre o alias"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-mono text-neon-blue uppercase tracking-wider">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors placeholder:text-gray-600"
                                    placeholder="tu@correo.com"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? (
                                        <span className="animate-pulse">Procesando...</span>
                                    ) : (
                                        <>
                                            Suscribirse <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-6">
                                <ShieldCheck size={14} className="text-neon-green" />
                                <span>Cero spam. Solo contenido de alta calidad. Date de baja cuando quieras.</span>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
