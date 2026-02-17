export const categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Health' },
    { id: 3, name: 'Travel' },
    { id: 4, name: 'Food' },
    { id: 5, name: 'Lifestyle' },
    { id: 6, name: 'Education' },
    { id: 7, name: 'Finance' },
    { id: 8, name: 'Entertainment' },
    { id: 9, name: 'Sports' },
    { id: 10, name: 'Science' },
];



let nextId = categories.length;

export function getNextId() {
    nextId++;
    return nextId;
}

export function resetDb() {
    categories.length = 0;
    nextId = categories.length;
}
