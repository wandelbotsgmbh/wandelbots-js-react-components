import { Vector2 } from "three";
declare module "three" {
    interface Vector3 {
        toVector2(): Vector2;
    }
}
