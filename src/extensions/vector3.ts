import { Vector2, Vector3 } from "three";

declare module "three" {
    interface Vector3 {
        toVector2(): Vector2;
    }
}

Vector3.prototype.toVector2 = function() {
    return new Vector2(this.x, this.y);
}