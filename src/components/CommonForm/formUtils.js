/**
 * Get value from object by path (string)
 * e.g. getNestedValue(obj, 'address.city')
 */
export const getNestedValue = (obj, path) => {
    if (!path) return undefined;
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
        if (current === undefined || current === null) return undefined;
        current = current[part];
    }
    return current;
};

/**
 * Set value in object by path (string)
 * Returns a new object (immutable)
 * e.g. setNestedValue(obj, 'address.city', 'New York')
 */
export const setNestedValue = (obj, path, value) => {
    if (!path) return obj;
    const parts = path.split('.');
    const newObj = { ...obj };
    let current = newObj;

    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        current[part] = { ...current[part] };
        current = current[part];
    }

    current[parts[parts.length - 1]] = value;
    return newObj;
};
