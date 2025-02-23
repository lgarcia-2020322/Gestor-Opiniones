import { body } from "express-validator" //Capturar todo el body de la solicitud
import { validateErrors } from "./validate.error.js"
import { existUsername, existEmail, existCategory } from "./db.valitadors.js"


export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
        validateErrors
]

export const updateUserValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const updatePassValidator = [
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
]

export const categoryValidator = [
    body('name', 'Category name cannot be empty')
        .notEmpty()
        .custom(existCategory),
    body('description', 'Description cannot be empty')
        .notEmpty(),
    validateErrors
]

export const createPostValidator = [
    body('title', 'Title cannot be empty')
        .notEmpty()
        .isLength({ max: 100 }),
    body('category', 'Category cannot be empty')
        .notEmpty()
        .isLength({ max: 50 }),
    body('content', 'Content cannot be empty')
        .notEmpty()
        .isLength({ max: 2000 }),
    validateErrors
]

export const updatePostValidator = [
    body('title')
        .optional()
        .notEmpty()
        .isLength({ max: 100 }),
    body('category')
        .optional()
        .notEmpty()
        .isLength({ max: 50 }),
    body('content')
        .optional()
        .notEmpty()
        .isLength({ max: 2000 }),
    validateErrors
]

export const commentValidator = [
    body('author', 'Author ID required')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid user ID'),
    body('content', 'Content cannot be empty')
        .notEmpty()
        .isLength({ max: 500 })
        .withMessage(`Can't be overcome 500 characters`),
    body('post', 'Post ID is required')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid Post ID'),
    validateErrors
]
