import React from "react";
import { BufferGeometry } from "three";

interface PointCloudBasicProps {
    size: number;
}

interface GeometryPointCloudProps extends PointCloudBasicProps {
    geometry: BufferGeometry
}

interface BufferPointCloudProps extends PointCloudBasicProps {
    positions: Float32Array;
    colors: Float32Array;
}

export type PointCloudProps = GeometryPointCloudProps | BufferPointCloudProps;

export function PointCloud(props: PointCloudProps) {
    return ("geometry" in props ? <GeometryPointCloud {...props} /> : <BufferPointCloud {...props} />)
}

function GeometryPointCloud(props: GeometryPointCloudProps) {
    return (
        <points geometry={props.geometry}>
            <pointsMaterial size={props.size} vertexColors />
        </points>
    )
}

function BufferPointCloud(props: BufferPointCloudProps) {
    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={props.positions}
                    count={props.positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={props.colors}
                    count={props.colors.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={props.size} vertexColors />
        </points>
    )
}