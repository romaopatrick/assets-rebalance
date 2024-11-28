export function replaceAtIndex<T>(array: T[], index: number, newObject: T): T[] {
    if (index < 0 || index >= array.length) {
        throw new Error("Index out of bounds");
    }

    return array.map((item, i) => (i === index ? newObject : item));
}