'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type SlugMap = Record<string, string>;

interface SlugContextType {
    slugs: SlugMap;
    setSlugs: (slugs: SlugMap) => void;
}

const SlugContext = createContext<SlugContextType | undefined>(undefined);

export function SlugProvider({ children }: { children: ReactNode }) {
    const [slugs, setSlugs] = useState<SlugMap>({});

    return (
        <SlugContext.Provider value={{ slugs, setSlugs }}>
            {children}
        </SlugContext.Provider>
    );
}

export function useSlugs() {
    const context = useContext(SlugContext);
    if (!context) {
        throw new Error('useSlugs must be used within a SlugProvider');
    }
    return context;
}

export function SlugUpdater({ slugs }: { slugs: SlugMap }) {
    const { setSlugs } = useSlugs();

    useEffect(() => {
        setSlugs(slugs);
    }, [slugs, setSlugs]);

    return null;
}
