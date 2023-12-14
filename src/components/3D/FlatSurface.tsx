import { DoubleSide, Plane, Vector3, Shape, Object3D, Color, Quaternion } from "three";
import React from "react";
import "../../extensions";

export interface FlatSurfaceProps {
    positions: Vector3[];
    color?: Color | string;
    outline?: boolean;
    outlineColor?: Color | string;
    onClick?: () => void;
}

export function FlatSurface(props: FlatSurfaceProps) {
    const plane = new Plane().setFromCoplanarPoints(props.positions[0], props.positions[1], props.positions[2]);
    const obj = new Object3D();
    plane.coplanarPoint(obj.position);
    obj.lookAt(obj.position.clone().add(plane.normal));

    const projectedPositions = props.positions.map(x => plane.projectPoint(x, new Vector3()));
    const localPositions2D = projectedPositions.map(x => obj.worldToLocal(x).toVector2());
    const shape = new Shape(localPositions2D);

    // TODO: Check why only toArray works in external package and not cloning a Vector3 or Quaternion to object
    return (
        <object3D
            position={obj.position.toArray()}
            quaternion={obj.quaternion.toArray() as any}
        >
            <mesh
                onClick={ev => props.onClick?.()} >
                <shapeGeometry args={[shape]} />
                <meshBasicMaterial color={props.color} side={DoubleSide} />
            </mesh>
            {
                props.outline &&
                <Outline positions={projectedPositions} color={props.outlineColor} linewidth={2} />
            }
        </object3D>
    );
}

interface OutlineProps {
    positions: Vector3[];
    color?: Color | string;
    linewidth?: number;
}

function Outline(props: OutlineProps) {
    const positions = new Float32Array(
        props.positions.flatMap(x => x.toArray()).concat(props.positions[0].toArray())
    );

    return (
        <line>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color={props.color} linewidth={props.linewidth} />
        </line>
    )
}