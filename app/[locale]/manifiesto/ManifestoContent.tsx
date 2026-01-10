'use client';

import { motion } from 'framer-motion';

interface ManifestoSection {
    title: string;
    content: string;
}

interface ManifestoContentProps {
    sections: ManifestoSection[];
}

const borderColors = [
    'border-neon-blue',
    'border-neon-purple',
    'border-neon-green'
];

export default function ManifestoContent({ sections }: ManifestoContentProps) {
    return (
        <>
            {sections.map((section, index) => {
                const borderColor = borderColors[index % borderColors.length];

                return (
                    <motion.section
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className={`border-l-2 ${borderColor} pl-6`}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6 mt-2">
                            {section.title}
                        </h2>
                        <div
                            className="leading-loose prose prose-invert max-w-none 
                                       [&_p]:leading-loose [&_p]:text-gray-300 [&_p]:mb-4"
                            dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                    </motion.section>
                );
            })}
        </>
    );
}
