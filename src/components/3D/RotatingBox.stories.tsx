import React from "react";
import { Meta } from '@storybook/react';
import { OrbitControls } from '@react-three/drei';
import { RotatingBox } from "./RotatingBox";
import { Canvas } from "@react-three/fiber";

export default {
    title: "RotatingBox",
    component: RotatingBox,
} as Meta;

export const Default = () => {

    return (
        <div style={{ height: "100vh" }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight />
                <OrbitControls />
                <RotatingBox />
            </Canvas>
        </div>
    );
};
