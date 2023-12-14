import React from "react";
import { Meta } from '@storybook/react';
import { OrbitControls } from '@react-three/drei';
import { FlatSurface } from "./FlatSurface";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";

export default {
    title: "FlatSurface",
    component: FlatSurface,
} as Meta;

export const Default = () => {

    return (
        <div style={{ height: "100vh" }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight />
                <OrbitControls />
                <FlatSurface 
                    positions={[
                        new Vector3(2, 0, -1),
                        new Vector3(3, 0, -1),
                        new Vector3(3, 1, -1)
                    ]}
                    color={"green"}
                    outline
                    outlineColor={"red"}
                />
                <FlatSurface 
                    positions={[
                        new Vector3(-1, 0, -1),
                        new Vector3(-1, 0, -2),
                        new Vector3(-1, 1, -2)
                    ]}
                    color={"yellow"}
                    outline
                    outlineColor={"black"}
                />
                <FlatSurface 
                    positions={[
                        new Vector3(0, 0, 0),
                        new Vector3(1, 0, 0),
                        new Vector3(1, 1, 0),
                        new Vector3(0, 1, 0)
                    ]}
                    color={"blue"}
                />
            </Canvas>
        </div>
    );
};
