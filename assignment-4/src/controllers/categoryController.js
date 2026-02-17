import { getAllCategories, getCategoriesById, createCategories, updateCategories, deleteCategories, } from "../services/categoryService.js";

export function getAllCategoriesHandler(req, res) {
    let categories = getAllCategories();
    res.status(200).json(categories);
}

export function getCategoriesByIdHandler(req, res) {

    const id = parseInt(req.params.id);
    const category = getCategoriesById(id);

    return res.status(200).json(category);
}

export function createCategoriesHandler(req, res) {
    const { name } = req.body;
    const newCategory = createCategories({ name });
    res.status(201).json(newCategory);
}

export function updateCategoriesHandler(req, res) {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const updatedCategory = updateCategories(id, { name });
    res.status(200).json(updatedCategory);


}

export function deleteCategoriesHandler(req, res) {
    const id = parseInt(req.params.id);
    deleteCategories(id);
    res.status(204).send();
}
