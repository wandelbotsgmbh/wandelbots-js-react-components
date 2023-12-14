export {};

declare global {
    interface Array<T> {
        remove(value: T): Array<T>;
        group(count: number): Array<Array<T>>;
    }
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function(value) {
        return this.splice(this.indexOf(value), 1);
    }
} else {
    console.warn("Array.prototype.remove was already set");
}

if (!Array.prototype.group) {
    Array.prototype.group = function(count: number) {
        const arr = [];
        for (let i = 0; i < this.length; i += count) {
            let subarry = [];
            for (let j = 0; j < count; j++) {
                subarry.push(this[i + j]);
            }
            arr.push(subarry);
        }
        return arr;
    }
} else {
    console.warn("Array.prototype.group was already set");
}
