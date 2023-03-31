export function sortBy<T>(
    array: T[],
    getter: (item: T) => string | number | boolean
): T[] {
    const sortedArray = [...array];
    sortedArray.sort((a, b) =>
        // eslint-disable-next-line no-nested-ternary
        getter(a) > getter(b) ? 1 : getter(b) > getter(a) ? -1 : 0
    );
    return sortedArray;
}
