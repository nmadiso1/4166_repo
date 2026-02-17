import { getNextId, categories } from '../db/categories.js';

export function getAll() {
    return categories;
    }


export function getById(id) {
    let category = categories.find((category) => category.id === id);
    return category;
}

export function create(categoryData) {
    const newCategory = {
        id: getNextId(),
        name: categoryData.name
    };
    categories.push(newCategory);
    return newCategory;
}


export function update(id, updatedData) {
    const category = categories.find(category => category.id === id);
    if (!category) return undefined

    if (updatedData.title) category.title = updatedData.title
    if (updatedData.content) category.content = updatedData.content;
    return category;
}

export function remove(id) {
    const index = categories.findIndex(category => category.id === id);
    if (index === -1) return false;
    category.splice(index, 1);
    return true;
}