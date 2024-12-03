export function getEnumKeys<E extends object>(enumObj: E): (keyof E)[] {
    return Object.keys(enumObj).filter(key => isNaN(Number(key))) as (keyof E)[];
}