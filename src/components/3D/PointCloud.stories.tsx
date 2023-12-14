import React from "react";
import { Meta } from '@storybook/react';
import { OrbitControls } from '@react-three/drei';
import { PointCloud } from "./PointCloud";
import { Canvas } from "@react-three/fiber";

export default {
    title: "PointCloud",
    component: PointCloud,
} as Meta;

export const Default = () => {

    return (
        <div style={{ height: "100vh" }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight />
                <OrbitControls />
                <PointCloud 
                    positions={new Float32Array([
                        0, 0, 0,
                        1, 0, 0,
                        0, 1, 0,
                        0, 0, 1
                    ])}
                    colors={new Float32Array([
                        0, 0, 0,
                        1, 0, 0,
                        0, 1, 0,
                        0, 0, 1
                    ])}
                    size={0.25}
                />
            </Canvas>
        </div>
    );
};
