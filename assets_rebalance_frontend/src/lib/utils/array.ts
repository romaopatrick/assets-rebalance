export function replaceAtIndex<T>(array: T[], index: number, newObject: T): T[] {
    if (index < 0 || index >= array.length) {
        throw new Error("Index out of bounds");
    }

    return array.map((item, i) => (i === index ? newObject : item));
}

export function groupByToSet<T, K>(
    array: T[],
    keyGetter: (item: T) => K
  ): Map<K, Set<T>> {
    return array.reduce((result, item) => {
      const key = keyGetter(item);
      if (!result.has(key)) {
        result.set(key, new Set<T>()); // Initialize the group as a Set
      }
      result.get(key)!.add(item); // Add the item to the Set
      return result;
    }, new Map<K, Set<T>>());
  }