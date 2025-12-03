'use client';

import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';

export default function ManifestoPage() {
    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 pb-32">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <GlitchText text="Manifiesto" as="h1" className="text-5xl md:text-7xl font-bold mb-6" />
                    <p className="text-xl text-neon-blue font-mono">
                        Lo que viene no espera.
                    </p>
                </motion.div>

                <div className="space-y-12 text-lg md:text-xl leading-relaxed text-gray-300 font-light">
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="border-l-2 border-neon-blue pl-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">El Caos como Origen</h2>
                        <p>
                            Vivimos en el vórtice. Un punto de inflexión donde las viejas estructuras se disuelven antes de que las nuevas hayan terminado de formarse. No es una crisis, es una metamorfosis.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="border-l-2 border-neon-purple pl-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">La Obsolescencia Humana</h2>
                        <p>
                            Por primera vez en la historia, nos enfrentamos a la posibilidad real de nuestra propia irrelevancia productiva. ¿Qué somos cuando ya no somos útiles? Esta es la pregunta fundamental de nuestro tiempo.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="border-l-2 border-neon-green pl-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Pregunta, Imagina, Actúa</h2>
                        <p>
                            Vōrtika no es un refugio, es un mapa. Un intento de cartografiar el territorio desconocido que se abre ante nosotros. No ofrecemos respuestas fáciles, sino las preguntas correctas.
                        </p>
                    </motion.section>
                </div>
            </div>
        </div>
    );
}
