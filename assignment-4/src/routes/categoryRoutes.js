import express from 'express';
import {
    getAllCategoriesHandler,
    getCategoriesByIdHandler,
    createCategoriesHandler,
    updateCategoriesHandler,
    deleteCategoriesHandler
} from '../controllers/categoryController.js';



const router = express.Router();

router.get('/categories', getAllCategoriesHandler);
router.get('/categories/:id', getCategoriesByIdHandler);
router.post('/categories', createCategoriesHandler);
router.put('/categories/:id', updateCategoriesHandler);
router.delete('/categories/:id', deleteCategoriesHandler);


export default router;