import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { existsByName } from '../repositories/categoryRepo.js';

export const validateCategoryId = [
    param('id')
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage('Id must be a positive integer'),

    handleValidationErrors,
];

export const validateCreateCategory = [
    body('name')
        .exists({ values: 'falsy' })
        .withMessage('Name is required')
        .bail()
        .trim()
        .escape()
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters')
        .bail()
        .custom((value) => {
            if (existsByName(value)) {
                throw new Error(`Category name "${value}" already exists`);
            }
            return true;
        }),

    handleValidationErrors,
];

export const validateUpdateCategory = [
    body('name')
        .exists({ values: 'falsy' })
        .withMessage('Name is required')
        .bail()
        .trim()
        .escape()
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters')
        .bail()
        .custom((value, { req }) => {
            if (!value) return true;

            // Prevent duplicate names except for the current category
            const id = parseInt(req.params.id);
            const exists = existsByName(value);

            if (exists) {
                throw new Error(`Category name "${value}" already exists`);
            }

            return true;
        }),

    handleValidationErrors,
];
