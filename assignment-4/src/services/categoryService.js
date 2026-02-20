import { getAll, getById, create, update, remove } from '../repositories/categoryRepo.js';

export function getAllCategories() {

    return getAll();
}

export function getCategoriesById(id) {
    const category = getById(id);
    console.log(category)
    if (category) return category
    else {
        const error = new Error(`Category ${id} not found`);
        error.status = 404;
        throw error;

    }
}

export function createCategories(categoryData) {
    return create(categoryData);
}

export function updateCategories(id, updatedData) {
    const updateCategory = update(id, updatedData);
    if (updateCategory) return updateCategory;
    else {
        const error = new Error(`Category ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export function deleteCategories(id) {
    const result = remove(id);
    if (result) return;
    else {
        const error = new Error(`Category ${id} not found`);
        error.status = 404;
        throw error;
    }
}