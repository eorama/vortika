'use client';

import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

// Custom sphere generation to avoid NaN issues
const generateSpherePositions = (count: number, radius: number) => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = radius * Math.cbrt(Math.random());

        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);
    }

    return positions;
};

const StarField = (props: any) => {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => generateSpherePositions(5000, 1.5));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <StarField />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default StarBackground;

