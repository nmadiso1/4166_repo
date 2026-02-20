import express from 'express';
import {
    getAllCategoriesHandler,
    getCategoriesByIdHandler,
    createCategoriesHandler,
    updateCategoriesHandler,
    deleteCategoriesHandler
} from '../controllers/categoryController.js';

import {
    validateCategoryId,
    validateCreateCategory,
    validateUpdateCategory
} from '../middleware/categoryValidators.js';



const router = express.Router();

router.get('/', getAllCategoriesHandler);
router.get('/:id', validateCategoryId, getCategoriesByIdHandler);
router.post('/', validateCreateCategory, createCategoriesHandler);
router.put('/:id', validateCategoryId, validateUpdateCategory, updateCategoriesHandler);
router.delete('/:id', validateCategoryId, deleteCategoriesHandler);


export default router;