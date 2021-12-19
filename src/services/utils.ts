let lastId = 0;

export function createNewId(prefix='id') {
    lastId++;
    return `${prefix}${lastId}`;
}