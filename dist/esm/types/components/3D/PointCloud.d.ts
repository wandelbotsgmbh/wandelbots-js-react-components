import React from "react";
import { BufferGeometry } from "three";
interface PointCloudBasicProps {
    size: number;
}
interface GeometryPointCloudProps extends PointCloudBasicProps {
    geometry: BufferGeometry;
}
interface BufferPointCloudProps extends PointCloudBasicProps {
    positions: Float32Array;
    colors: Float32Array;
}
export type PointCloudProps = GeometryPointCloudProps | BufferPointCloudProps;
export declare function PointCloud(props: PointCloudProps): React.JSX.Element;
export {};
